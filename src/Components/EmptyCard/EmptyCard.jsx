import React from 'react'

const EmptyCard = ({ image , message }) => {
  return (
    <div className='flex items-center justify-center flex-col h-[70vh]'> 
      <div className='text-center flex flex-col gap-4'>
        <img className='h-[60vh]' src={image} alt="" />
        <p className='font-bold font-mono'>{message}</p>
      </div>
    </div>
  )
}

export default EmptyCard
