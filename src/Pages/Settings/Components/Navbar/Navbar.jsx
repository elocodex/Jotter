import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({t}) => {
  return (
    <div>
      <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow fixed w-full top-0 z-10'>
        <h2 className='text-2xl md:text-4xl font-semibold text-black py-2'>Jotter</h2>
        <div className='flex gap-6 items-center pl-5 py-3 font-semibold'>
            <Link to='/dashboard'><h1 className='text-md'>{t("dashboard")} <i className="fa-solid fa-house w-1"></i></h1></Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
