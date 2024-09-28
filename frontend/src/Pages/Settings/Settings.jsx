import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import Account from './Components/Account/Account'
import About from './Components/About/About'
import axiosInstance from '../../Utils/axiosInstance'
import { getInitials } from '../../Utils/helper'
import Navbar from './Components/Navbar/Navbar'
import LanguageChanger from '../../Components/LanguageChanger/LanguageChanger'
import { useTranslation } from 'react-i18next'

const Settings = () => {

    const [userInfo,setUserInfo] = useState(null)
    const [allNotes,setAllNotes] = useState([])
    const [isLoading,setIsLoading] = useState(false)

    const {t} = useTranslation();

    const navigate = useNavigate()

     // Get User Info
    const getUserInfo = async () => {
        try {
        const response = await axiosInstance.get("/get-user")
        
        
        if(response.data && response.data.user){
            setUserInfo(response.data.user)
        }

        } catch (err) {
            console.log(err.message);
        }

    
    }
    const getAllNotes = async () => {
        try {
          const response = await axiosInstance.get("/get-all-notes/")
          if(response.data && response.data.notes){
            setAllNotes(response.data.notes)
            if(response.data.notes < 1 ){
              console.log("no notes found");
              
            }
          }
    
        } catch (err) {
          console.log("An unexpected Error Occured.Please try Again");
          
        }
    }

    const deleteAccount = async () => {
        try {
            const response = await axiosInstance.delete("/deleteAccount")
            setIsLoading(true)
            console.log(response);
            
            if(response.data && !response.data.error){
                setIsLoading(false)
                localStorage.clear()
                navigate('/login')
            }

            } catch (err) {
                setIsLoading(false)
                console.log(err.message);
            }
    }

    useEffect(() => {
        getUserInfo()
        getAllNotes()
        return () => {}
    },[])

    const onLogout = () =>{
        localStorage.clear()
        navigate('/login')
    }

  return (
    <section className='flex flex-col justify-between pt-20'>
        <Navbar t={t} />
        <div className='flex justify-between w-full h-[75vh] relative'>
            <div className='bg-primary w-full rounded-xl fixed top-24 left-0 py-10'>
                <div className='overflow-scroll h-[100vh] scrollbar-hide'>
                    <div className='py-24'>
                        <h1 className='text-4xl text-center font-bold text-white'>{t('settings')}</h1>
                        <div className='px-4 flex flex-col items-center gap-4'>
                            <div className='w-48 h-48 text-5xl font-mono mt-12 flex items-center justify-center rounded-full text-dark font-medium bg-slate-100 hover:bg-slate-300 transition-colors'>
                                {getInitials(userInfo?.fullName)}
                            </div>
                            <h2 className='text-4xl text-white'>{t("hi")}, <span className='font-bold'>{userInfo?.fullName}</span></h2>
                        </div>
                    </div>
                    
                    <Account t={t} userInfo={userInfo} onLogout={onLogout} allNotes={allNotes} isLoading={isLoading} deleteAccount={deleteAccount} />
                    <LanguageChanger />
                    <About t={t} />

                </div>
            </div>
        </div>
    </section>
  )
}

export default Settings
