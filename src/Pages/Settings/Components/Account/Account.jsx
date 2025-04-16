import React, { useEffect, useState } from 'react'
import moment from 'moment';

const Account = ({ userInfo, onLogout, allNotes, deleteAccount, isLoading,t }) => {
  return (
    <div>
      <div className='py-16 text-white' id='account'>
            <h1 className='text-4xl text-center font-bold'>{t("account")}</h1>
            <div className='0 my-20 px-10'>
                <p className='text-2xl font-bold'>{t("accountDetails")}</p>
                <div className='flex justify-between w-full mt-10 flex-wrap gap-5'>
                    <div className='min-h-4 min-w-40 md:w-80 bg-darkPrimary hover:bg-[#050505] transition-all pl-5 p-2 rounded-md '>
                        <p className='font-light' > {t("fullname")} </p>
                        <p className='font-bold' >{userInfo?.fullName}</p>
                    </div>
                    <div className='min-h-4 min-w-40 md:w-80  bg-darkPrimary hover:bg-[#050505] transition-all pl-5 p-2 rounded-md '>
                        <p className='font-light' >{t("notesCreated")}</p>
                        <p className='font-bold' >{allNotes?.length}</p>
                    </div>
                    <div className='min-h-4 min-w-40 md:w-80  bg-darkPrimary hover:bg-[#050505] transition-all pl-5 p-2 rounded-md '>
                        <p className='font-light' >{t("accountCreatedOn")}</p>
                        <p className='font-bold' >{moment(userInfo?.createdOn).format('Do MMM YYYY')}</p>
                    </div>
                    <div className='min-h-4 min-w-40 md:w-80 bg-darkPrimary hover:bg-[#050505] transition-all pl-5 p-2 rounded-md '>
                        <p className='font-light'>{t("email")}</p>
                        <p className='font-bold' >{userInfo?.email}</p>
                    </div>
                </div>
            </div>
            <div className='0 my-20 px-10'>
                <p className='text-2xl font-bold'>{t("accountDeactivation")}</p>
                <button onClick={onLogout} className='my-5 text-white p-2 rounded transition-colors bg-[#141414] hover:bg-[#050505] min-w-28 mr-5'>{isLoading == true ? 'Bye Bye...' : t("logout")}</button>
                <button onClick={deleteAccount} className='my-5 text-white p-2 rounded transition-colors bg-red-600 hover:bg-red-800 min-w-40'>{isLoading == true ? 'Deleting...' : t("deleteAccount")}</button>
            </div>
        </div>
    </div>
  )
}

export default Account
