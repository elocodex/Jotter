import React from 'react'
import { useTranslation } from 'react-i18next';
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'


const SearchBar = ({ value, onChange, handleSearch, onClearSearch, userInfo, handleKeyDown }) => {

  const {t} = useTranslation();

  return (
    userInfo && <div className='w-26 md:w-96 flex items-center px-4 bg-slate-100 rounded-md '>
      <input 
        type='text'
        placeholder = { t("searchPlaceholder") }
        className='w-full text-xs bg-transparent py-[11px] outline-none'
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        />

        {value && <IoMdClose className='text-xl text-slate-500 cursor-pointer hover:text-black mr-3' onClick={onClearSearch} />}
        <FaMagnifyingGlass
            className='text-slate-400 cursor-pointer hover:text-black mr-3'
            onClick={handleSearch}
        />
    </div>
  )
}

export default SearchBar
