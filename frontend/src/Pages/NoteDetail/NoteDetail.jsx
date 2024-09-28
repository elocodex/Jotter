import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../Utils/axiosInstance'
import BottomBar from '../../Components/BottomBar/BottomBar'
import toast, { Toaster } from 'react-hot-toast'

const NoteDetail = () => {
  // Variables
  const {noteId}  = useParams()
  const [note,setNote] = useState([])
  const navigate = useNavigate()
  const [isLoading,setIsLoading] = useState(null)
  const [content, setContent] = useState(null);
  const [tags,setTags] = useState(null)
  const [title,setTitle] = useState(null)
  const [canEdit,setCanEdit] = useState(false)
  const initialTitle = note?.title || null;
  const initialTags = note?.tags || [];
  const initialContent = note?.content || [];

 useEffect(() => {
  if(title !== initialTitle || JSON.stringify(tags) !== JSON.stringify(initialTags) || content!== initialContent){
    setCanEdit(true)
  }else{
    setCanEdit(false)
  }
 }, [title, tags, content, initialTitle, initialTags, initialContent])
    
    useEffect(() => {
        setTitle(note.title || "");
        setContent(note.content || "");
        setTags(note.tags || "")
      }, [note.title,note.content]);

    useEffect(()=>{
      getNoteDetails(noteId)
      return ()=>{}
  },[])

    // Get Note Details
  const getNoteDetails = async (noteId) => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.get('/dashboard/notes/', {params: {noteId}})
      if(response.data && response.data.note){
        setNote(response.data.note)
        setIsLoading(false)

        if(response.data.note < 1 ){
        setIsLoading(False)
          console.log("no notes found");
        }
      }
    } catch (err) {
      console.log("i failed");
        setIsLoading(false)
        console.log(err);
    }
  }

  // Delete Note
  const deleteNote = async (data) => {
    try {
      const response = await axiosInstance.delete("/delete-note/"+ noteId)

      if(response.data && !response.data.error){
        toast.success("Note Deleted!")
        navigate("/dashboard")
      }
    }catch (err) {
      if(err.response && err.response.data && err.response.data.message){
        toast.error("Note Deletion Failed!")
        console.log("An unexpected error Occured. Please try Again!");
      }
    }
  }

  // Edit Note
  const editNote = async () => {
    try {
      const response = await axiosInstance.put("/edit-note/"+ noteId ,{
      title,
      content,
      tags,
    })
      if(response.data && response.data.note){
        setCanEdit(false)
        toast.success("Edit Succesful")
        getNoteDetails(noteId)
      }

    } catch (err) {
      setCanEdit(false)
      if(err.response && err.response.data && err.response.data.message){
        toast.error("Edit Failed")
        setErrror(err.response.data.message)
      }
    }
  }

    const handleContent = (e) => {
        setContent(e.target.innerText);
    };
    const handleTitle= (e) => {
      setTitle(e.target.innerText);
    };

  return (
    <div className='bg-slate-100 px-5 py-4 text-white relative'>
      <Toaster position='top-center' />
      <nav className='py-5 flex justify-between items-center bg-primary px-8 rounded-s-full'>
        <div onClick={() => {navigate('/dashboard')}} className='flex justify-center items-center w-8 h-8 rounded-full cursor-pointer bg-slate-100 text-primary hover:bg-slate-300 transition-colors p-5'><i className="fa-solid fa-arrow-left"></i></div>
        <div>
        </div>
      </nav>

    <section className='border-2 border-dotted border-gray-200 bg-primary w-full h-[65vh] overflow-hidden mt-10 rounded-xl px-4 py-8'>
        {isLoading ? <div className='blob'></div> : (
            <div className='h-[60vh] overflow-hidden'>
              <header className='font-bold text-6xl text-ellipsis mb-4 flex flex-col gap-3 justify-start items-start'>
                  <div
                      className='outline-none'
                      contentEditable suppressContentEditableWarning={true} onInput={handleTitle} 
                      onChange={({target}) =>setTitle(target.value)}
                  >{note.title}</div>
                  <div className='flex gap-1'>
                      {note.tags && note.tags.map((tags,index) => (
                          <div className='text-sm outline-none' key={index}>{tags}</div>
                      ))}
                  </div>
              </header>
              <div contentEditable suppressContentEditableWarning={true} onInput={handleContent} className='flex flex-col h-[40vh] text-xl overflow-scroll scrollbar-hide border-none outline-none'>
                  {note.content}
              </div>
        </div>
        )}
    </section>

    <BottomBar note={note} canEdit={canEdit} onDelete={deleteNote} onEdit={editNote} />

    </div>
  )
}

export default NoteDetail
