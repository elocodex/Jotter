import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Sidebar = () => {

    const navigate = useNavigate()
    const location = useLocation()


  return (
    <div className='w-1/3 h-full py-8 px-4 flex flex-col gap-4'>
        <div className='flex gap-4 bg-primary w-24 justify-center rounded-md'>
            <div onClick={() => {navigate(-1)}} className='w-8 h-8 flex items-center justify-center cursor-pointer rounded-full transition-all hover:bg-[#141414]'><i className="text-white fa-solid fa-caret-left"></i></div>
            <div onClick={() => {navigate(1)}} className='w-8 h-8 flex items-center justify-center cursor-pointer rounded-full transition-all hover:bg-[#141414]'><i className="text-white fa-solid fa-caret-right"></i></div>
        </div>
      <Link to='/settings'>
        <div className={`${location.pathname === '/settings' && '/settings/' ? 'bg-primary text-gray-100' : 'border border-black text-red-900'} hover:text-gray-100 hover:bg-[#141414] font-bold rounded-md p-4 text-white cursor-pointer`}
        >
            Settings
        </div>
      </Link>

      <Link to='/settings/preferences'>
        <div className={`${location.pathname === '/settings/preferences' && '/settings/preferences/' ? 'bg-primary text-gray-100': 'border border-black text-red-900'} hover:text-gray-100 hover:bg-[#141414] font-bold rounded-md p-4 text-white cursor-pointer`}>
            Preferences
        </div>

      </Link>
      
      <Link to='/settings/account'>
        <div className={`${location.pathname === '/settings/account' && '/settings/account/' ? 'bg-primary text-gray-100' : 'border border-black text-red-900'} hover:text-gray-100 hover:bg-[#141414] font-bold rounded-md p-4 text-white cursor-pointer`}>
            Account
        </div>
      </Link>

      <Link to='/settings/about'>
        <div className={`${location.pathname === '/settings/about' && '/settings/about/' ? 'bg-primary text-gray-100' : 'border border-black text-red-900'} hover:text-gray-100 hover:bg-[#141414] font-bold rounded-md p-4 text-white cursor-pointer`}>
            About
        </div>
      </Link>

    </div>
  )
}

export default Sidebar
