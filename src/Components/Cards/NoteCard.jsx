import React from 'react'
import { MdOutlinePushPin } from 'react-icons/md'
import { MdCreate, MdDelete } from 'react-icons/md'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned, 
    onEdit, 
    onDelete, 
    OnPinNote ,
    id
    }) => {

    const navigate = useNavigate()
        
  return (
    <div  className='bg-white border rounded p-4 cursor-pointer hover:shadow-xl transition-all ease-in-out'> 
        <div className='flex items-center justify-between'>
            <div onClick={()=>{navigate(`/dashboard/notes/${id}`)}}>
                <h6 className='text-sm font-medium'>{title}</h6>
                <span className='text-sm text-slate-500'>{moment(date).format('Do MMM YYYY')}</span>
            </div>

            <MdOutlinePushPin className={ ` icon-btn  ${isPinned ? 'text-primary' : 'text-slate-300'}`} onClick={OnPinNote} />
        </div>
        <p onClick={()=>{navigate(`/dashboard/notes/${id}`)}}  className={'icon-btn text-slate-600 mt-2'}>{content.length > 30 ? content.slice(0,30)+'...': content.slice(0,30) }</p>
        <div className='flex items-center justify-between mt-2 '>
            <div className='text-xs text-slate-500'>{tags.map((item)=>(`#${item} `))}</div>
            <div className='flex items-center gap-2'>
                <MdCreate
                    className='icon-btn hover:text-green-600 cursor-pointer'
                    onClick={onEdit}
                />
                <MdDelete 
                    className='icon-btn hover:text-red-500 cursor-pointer'
                    onClick={onDelete}
                />
            </div>
        </div>
    </div>
  )
}

export default NoteCard
