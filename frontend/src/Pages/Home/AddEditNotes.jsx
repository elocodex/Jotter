import React, { useState } from 'react'
import TagInput from '../../Components/Input/TagInput'
import { MdClose } from 'react-icons/md'
import axiosInstance from '../../Utils/axiosInstance'
import { Toaster,toast } from 'react-hot-toast'

const AddEditNotes = ({ noteData, type , onClose, getAllNotes}) => {

    const [title,setTitle] = useState( noteData?.title || "" )
    const [content,setContent] = useState( noteData?.content || "" )
    const [tags,setTags] = useState( noteData?.tags || [] )
    const [errror,setErrror] = useState(null)

    // Add note
    const addNewNotes = async ()=>{
      try {
        const response = await axiosInstance.post("add-note",{
        title,
        content,
        tags,
      })
        if(response.data && response.data.note){
          toast.success("Note Added!")
          getAllNotes()
          onClose()
        }
      } catch (err) {
        if(err.response && err.response.data && err.response.data.message){
          toast.error("Error Adding Note")
          setErrror(err.response.data.message)
        }
      }
    }

    // Edit Note
    const editNote = async () => {
      const noteId  = noteData._id
      try {
        const response = await axiosInstance.put("/edit-note/"+ noteId ,{
        title,
        content,
        tags,
      })
        if(response.data && response.data.note){
          toast.success("Note Updated Succesfully")
          getAllNotes()
          onClose()
        }

      } catch (err) {
        if(err.response && err.response.data && err.response.data.message){
          toast.error("Note Update Failed")
          setErrror(err.response.data.message)
        }
      }
    }

    const handleAddNotes = ()=>{
        if(!title){
            setErrror("Please Enter the Title")
            return
        }
        if(!content){
            setErrror("Please Enter the Content")
            return
        }
        setErrror("")

        if(type === 'edit'){
            editNote()
        }else{
            addNewNotes()
        }
    }

  return (
    <div className='relative overflow-hidden'>
      <Toaster position='top-center' />
        <button 
            className='w-10 h-10 rounded flex items-center justify-center absolute -top-0 -right-0 hover:bg-slate-50'
            onClick={onClose}
        >
            <MdClose className='text-4xl text-slate-400' />
        </button>
      <div className='flex flex-col gap-2'>
        <label className='input-label'>TITLE</label>
        <input 
            type='text'
            className='text-2xl text-slate-500 outline-none'
            placeholder='Go to Gym At 5'
            value={title}
            onChange={({target}) =>setTitle(target.value)}
        />
      </div>
      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>CONTENT</label>
        <textarea
            type="text"
            className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
            placeholder='content'
            rows={10}
            value={content}
            onChange={({target}) =>setContent(target.value)}
        />
      </div>

      <div className='mt-3'>
        <label className='input-label'>TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

        {errror && <p className='text-red-500 text-xs pt-4'>{errror}</p>}

      <button className='btn-primary font-medium mt-5 p-3' onClick={()=>{handleAddNotes()}}> { type === 'edit' ? 'UPDATE'  :  'ADD'  } </button>
    </div>
  )
}

export default AddEditNotes
