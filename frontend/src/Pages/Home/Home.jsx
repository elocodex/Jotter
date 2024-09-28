import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import NoteCard from '../../Components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../Utils/axiosInstance'
import EmptyCard from '../../Components/EmptyCard/EmptyCard'
import addNewNote from '../../assets/add_new_note.svg'
import NoNoteFound from '../../assets/No-note-found.svg'
import notFound from '../../assets/_not_found.svg'
import { useTranslation } from 'react-i18next'
import { Toaster,toast } from 'react-hot-toast'


const Home = () => {
  const [loading, setLoading] = useState(true);
  const {t} = useTranslation();
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);  
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const [openAddEditModal,setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null
  })
  const [userInfo,setUserInfo] = useState(null)
  const navigate = useNavigate()
  const [allNotes,setAllNotes] = useState([])
  const [isSearch, setIsSearch] = useState(false)
  const [emptyMessage, setEmptyMessage] = useState("") 
  
  const [emptyImage, setEmptyImage] = useState("") 

  const hanldeEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true , data: noteDetails ,type:"edit" })
  }

  // Get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user")
      
      if(response.data && response.data.user){
        setUserInfo(response.data.user)
      }
    } catch (err) {
      console.log(err.message);
      
      if(err.response.status === 401){
        localStorage.clear()
        navigate('/login')
        console.log("Error");
        
      }
    }
  }

   // Get All Notes
   const getAllNotes = async () => {
    try {
      
      const response = await axiosInstance.get("/get-all-notes/")
      

      if(response.data && response.data.notes){
        setAllNotes(response.data.notes)
        if(response.data.notes < 1 ){
          console.log("no notes found");
          setEmptyImage(addNewNote)
          setEmptyMessage(t("noNote"))
        }
      }

    } catch (err) {
      console.log("An unexpected Error Occured.Please try Again");
      setEmptyImage(notFound)
      setEmptyMessage(t("errorNote"))
    }
  }

  useEffect(() => {
    getUserInfo();
    getAllNotes()
    return () => {}
  },[])

  // Delete Note
  const deleteNote = async (data) => {
    const noteId  = data._id
    try {
      const response = await axiosInstance.delete("/delete-note/"+ noteId)

      if(response.data && !response.data.error){
        toast.success("Note Deleted Succesfully!")
        // showToastMessage("Note Deleted Succesfully", "delete")
        getAllNotes()
      }
    }catch (err) {
      if(err.response && err.response.data && err.response.data.message){
        toast.error("An unexpected error Occured. Please try Again!")
      }
    }
  }

  // Search Notes
  const onSearchNotes = async (query) =>{
    try {
      const response = await axiosInstance.get('/search-notes', {params: {query}})
      console.log(response);
      

      if(response.data && response.data.notes){
        setIsSearch(true)
        setAllNotes(response.data.notes)

        if(response.data.notes < 1 ){
          console.log("no notes found");
          
          setEmptyImage(NoNoteFound)
          setEmptyMessage(t("queryNote"))
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Update Pinned Note
  const updateisPinned = async (noteData) => {
    const noteId  = noteData._id
      try {
        const response = await axiosInstance.put("/update-note-pinned/"+ noteId ,{
        isPinned:  !noteData.isPinned
      })
        if(response.data && response.data.note){
          toast.success("Note Pinned!")
          getAllNotes()
        }

      } catch (err) {
        toast.success("Note Pinning action was not completed!")
        // console.log(err);
      }
  }

  const handleClearSearch = () => {
    setIsSearch(false)
    getAllNotes()
  }

  return (
    <>
    <Toaster position='top-center' />
    {loading ? (
      <div className='h-screen flex  items-center'>
        <div className="spinner"></div>
      </div>
    )  : (
      <div className='relative'>
        <Navbar userInfo={userInfo}  onSearchNotes={onSearchNotes} handleClearSearch={handleClearSearch} />
      <div className='container mx-auto px-5 mt-9 py-10'>
        {allNotes.length > 0 ? (
          <div className='sm:grid sm:grid-cols-2 lg:grid-cols-3 md:gap-4 flex flex-col gap-4  mt-8'>
        {allNotes.map((item,index)=>(
          <NoteCard
          key={item._id}
          id={item._id}
          title={item.title}
          date={item.createdOn}
          content={item.content}
          tags={item.tags}
          isPinned={item.isPinned}
          onDelete={()=>{deleteNote(item)}}
          onEdit={()=>{hanldeEdit(item)}}
          OnPinNote={()=>{updateisPinned(item)}}
          />
        ))}
      </div>  ) :
      (  <EmptyCard image={emptyImage} message={emptyMessage} />)
    }
      </div>
      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-[#141414] fixed right-10 bottom-10' onClick={()=>{
        setOpenAddEditModal({isShown: true, type:'add',data:null})
      }}>
        <MdAdd className='text-[32px] text-white' />
      </button>
      <Modal 
          isOpen = {openAddEditModal.isShown}
          onRequestClose={()=>{}} 
          style={{
            overlay: {
                backgroundColor: "rgba(0,0,0,0.2"
            },
          }}
          contentLabel = ""
          className='w-[85%] lg:w-[60%] max-h-3/4 bg-white rounded-md mx-auto mt-24 p-5 overflow-hidden ' 
        >
          <AddEditNotes
            type={openAddEditModal.type}
            noteData={openAddEditModal.data}
            onClose={()=>{
              setOpenAddEditModal({isShown:false,type:"add",data:null})
            }} 
            getAllNotes={getAllNotes}
          />
        </Modal>
      </div>
        
    )}
  </>
  )
}

export default Home;
