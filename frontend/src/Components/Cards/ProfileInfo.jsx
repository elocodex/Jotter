import React from 'react'
import { getInitials } from '../../Utils/helper'
import { useNavigate } from 'react-router-dom'

const ProfileInfo = ({ onLogout, userInfo }) => {

  // console.log(userInfo.fullName);
  const navigate = useNavigate()
  
  return (
      userInfo && <div>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 md:w-16 md:h-16 flex items-center justify-center rounded-full text-slate-950 font-medium text-xs md:text-base bg-slate-100 hover:bg-slate-300 transition-colors'>
                {getInitials(userInfo.fullName)}
            </div>

            <div className='flex'>
              <i title='Settings' onClick={()=>{navigate('/settings')}} className="fa-solid fa-gear text-lg md:text-2xl text-primary hover:text-black cursor-pointer transition-all"></i>
            </div>
          </div>

      </div>

  )
}

export default ProfileInfo
