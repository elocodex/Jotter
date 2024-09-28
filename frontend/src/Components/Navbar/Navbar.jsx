import React, { useEffect, useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBAr/SearchBar'

const Navbar = ({ userInfo, onSearchNotes, handleClearSearch ,t }) => {

    const [searchQuerry,setSearchQuerry] = useState("")
    const screenWidth = window.innerWidth;
    const navigate = useNavigate()
    const [showSearch,setShowSearch] = useState(null)
    
    
    // Logout 
    const onLogout = () =>{
        localStorage.clear()
        navigate('/login')
    }
    const handleSearch = (e) => {
        if(searchQuerry){
            onSearchNotes(searchQuerry)
        }
    }

    const handleKeyDown = (e) => {
        if (e?.key === 'Enter') {
            e.preventDefault();
            onSearchNotes(searchQuerry);
        }
    }
    
    const onClearSearch = () => {
        setSearchQuerry("")
        if (typeof handleClearSearch === 'function') {
            handleClearSearch();
          }
        handleSearch()
    }
    

    useEffect(() => {
        if(searchQuerry.length < 1 ){
            onClearSearch()
        }
    },[searchQuerry])


  return (
    <div className='bg-white flex items-center justify-between px-2 sm:px-6 py-2 drop-shadow fixed w-full top-0 z-10'>
        <h2 className='text-xl md:text-4xl font-semibold text-black py-2'>Jotter</h2>

        <SearchBar
            value={searchQuerry}
            onChange={({target}) => {
                setSearchQuerry(target.value)
            }}
            userInfo={userInfo}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
            handleKeyDown={handleKeyDown}
            // handleClearSearch={handleClearSearch}
         />

        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  )
}

export default Navbar
