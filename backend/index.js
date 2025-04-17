require("dotenv").config()
const express = require("express");
const cors = require("cors")
const app = express()
const PORT = 8000

app.use(express.json())
const config = require("./config.json");
const { default: mongoose } = require("mongoose");

mongoose.connect(config.connectionString)
.then(() => console.log("Connected to MongoDB"))
const User = require("./models/userModel")
const Note = require("./models/noteModel")

const jwt = require("jsonwebtoken")
const { authenticateToken } = require("./utilities")

app.use(
    cors({
        origin: "*"
    })
)

// Create account endpoint
app.post("/createAccount", async (req,res) => {
    const {  fullName , email , password } = req.body
    if(!fullName){
        return res.status(400).json({
            error:true,message:"Full Name required!"
        })
    }
    if(!email){
        return res.status(400).json({
            error:true,message:"Email required!"
        })
    }
    if(!password){
        return res.status(400).json({
            error:true,message:"Password required!"
        })
    }

    const isUser = await User.findOne({email: email})
    if(isUser){
        return res.json({
            error: true, message:"User already Exists"
        })
    }

    const user = new User({
        fullName,
        email,
        password
    })
    await user.save()
    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m"
    })
})

// Login Endpoint
app.post("/login", async (req, res) => {
    const {email,password} = req.body
    if(!email){
        return res.status(400).json({message:"Email is required"})
    }
    if(!password){
        return res.status(400).json({message:"Password is required"})
    }
    const userInfo = await User.findOne({email: email})
    if(!userInfo){
        return res.status(400).json({
            message:"User not found"
        })
    }

    if(userInfo.email == email && userInfo.password == password){
        const user = { user: userInfo }
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m"
        })

        return res.json({
            error: false,
            message: "Login Successfull",
            email,
            accessToken
        })
    }else{
        return res.status(400).json({
            error: true,
            message:"Invlalid Credentials"
        })
    }
})   

// Get user Endpoint
app.get("/get-user", authenticateToken ,async (req, res) => {
    const {user} = req.user

    const isUser = await User.findOne({_id: user._id})
    if(!isUser){
        return res.sendStatus(401)
    }

    return res.json({
        user: {fullName: isUser.fullName, email: isUser.email, "_id": isUser._id},
        message: ""
    })
})

// Add Note endpoint
app.post("/add-note", authenticateToken , async (req,res) => {
    const {user} = req.user
    console.log(user._id);
    console.log("====");
    
    const {title,content,tags} = req.body

    if(!title){
        res.status(400).json({error:true,message:"Title is required"})
    }
    if(!content){
        res.status(400).json({error:true,message:"Content is required"})
    }

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id
        })

        await note.save()
        return res.json({
            error: false,
            note,
            message:"Note added successfully"
        })
    } catch (err) {
        console.log(err);
        
        return res.status(500).json({
            error: true,
            message:"Internal Server error"
        })
    }
    
})

// Edit note Endpoint
app.put("/edit-note/:noteId", authenticateToken , async (req,res) => {
    const noteId = req.params.noteId
    const {title,content,tags,isPinned} = req.body
    const { user } = req.user;
    console.log("====");
    console.log(noteId);
    

    if(!title && !content && !tags){
        return res.status(400).json({
            error:true,
            message:"No changes provided"
        })
    }
    try {
        const note = await Note.findOne({_id: noteId, userId: user._id})
        if(!note){
            return res.status(404).json({message:"Note not found"})
        }

        if(title) note.title = title
        if(content) note.content = content
        if(tags) note.tags = tags
        if(isPinned) note.isPinned = isPinned

        await note.save()

        return res.json({
            error: false,
            note,
            message:"Note Updated Successfully"
        })
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            error: true,
            message:"Internal Server Error!"
        })
    }
})

// Pin Note Endpoint
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        
        if (!note) {
            return res.status(404).json({
                error: true,
                message: "Note not found"
            });
        }

        note.isPinned = !note.isPinned;
        await note.save();
        
        return res.json({
            error: false,
            note,
            message: "Note pinned successfully"
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
});

// Get all Notes Endpoint
app.get("/get-all-notes", authenticateToken , async (req,res) =>{
    const {user} = req.user
    try{
        const notes = await Note.find({userId: user._id}).sort({isPinned: -1})

        return res.json({
            error:false,
            notes,
            messages: "All notes retrieved successfully"
        })

    }catch(err){
        return res.status(500).json({
            error:true,
            message:"Internal Server Error"
        })
    }
})

// Delete Note Enpoint
app.delete("/delete-note/:noteId", authenticateToken, async(req,res) =>{
    const noteId = req.params.noteId
    const {user} = req.user
    console.log(user);
    

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id })
        console.log(note);
        

        if(!note){
            return res.status(404).json({
                error: true,
                messages:"Note not found"
            })
        }

        await Note.deleteOne({_id: noteId, userId: user._id})
        return res.json({
            error: false,
            message: "Note deleted Successfully!"
        })
    } catch (err) {
        return res.status(500).json({
            error: true,
            message:"Internal Server Error"
        })
    }
})

// Update isPinned
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId
    const {isPinned} = req.body
    const {user} = req.user
    console.log("====");
    console.log(noteId);
  
    try {
        const note = await Note.findOne({_id: noteId, userId: user._id})
        if(!note){
            return res.status(404).json({message:"Note not found"})
        }

        note.isPinned = isPinned

        await note.save()

        return res.json({
            error: false,
            note,
            message:"Note Updated Successfully"
        })
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            error: true,
            message:"Internal Server Error!"
        })
    }
});

// Search Notes Endpoint
app.get("/search-notes", authenticateToken, async (req, res) => {
    const { user } = req.user;
    const { query } = req.query;

    try {
        const notes = await Note.find({
            userId: user._id,
            $or: [
                { title: { $regex: query, $options: "i" } },
                { content: { $regex: query, $options: "i" } },
                { tags: { $regex: query, $options: "i" } } 
            ]
        }).sort({ isPinned: -1 });

        return res.json({
            error: false,
            notes,
            message: "Notes found successfully"
        });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
});

// Get Note details endpoint
app.get('/dashboard/notes/:noteId', authenticateToken, async (req, res) => {
    const { noteId } = req.params;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        console.log(note);
        

        if (!note) {
            return res.status(404).json({
                error: true,
                message: 'Note not found or access denied'
            });
        }

        return res.json({
            error: false,
            note: note,
            message: 'Note found'
        });

    } catch (err) {
        console.log(err.message);

        return res.status(500).json({
            error: true,
            message: 'Internal Server Error'
        });
    }
});

// Delete Account Enpoint
app.delete('/deleteAccount', authenticateToken, async (req, res) => {
    const { user } = req.user;

    try {
        await User.findByIdAndDelete(user._id);

        return res.json({
            error: false,
            message: 'Account deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: 'Internal Server Error',
        });
    }
});

app.get("/", (req,res) => {
    res.send("Yo Welcome To My dev Space")
    console.log("Yo Welcome To My dev Space");
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;