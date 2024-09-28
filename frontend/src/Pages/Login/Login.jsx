import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../Components/Input/PasswordInput'
import { validateEmail } from '../../Utils/helper'
import axiosInstance from '../../Utils/axiosInstance'
import noteBook from '/notebook.png'

const Login = () => {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState(null)
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Please Enter A Valid Email Address")
      return
    }
    if(!password){
      setError("Please Enter the Password")
      return
    }
    setError("")

    // Login Api Call
    try {
      setIsLoading(true)
      const response = await axiosInstance.post("/login",{
        email: email,
        password: password
      })

      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        navigate('/dashboard')
      }

    } catch (err) {
      if(err.response && err.response.data && err.response.data.message){
        setError(err.response.data.message)
        setIsLoading(false)
      }else{
        setError("Well, this is awkward... Something went wrong! Try again in a bit!")
        setIsLoading(false)
      }
    }

  }
  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-16'>
          <form onSubmit={handleLogin}>
            <div className='flex items-center justify-center w-full'>
              <img className='w-28 h-28' src={noteBook} alt="" />
            </div>
            <h4 className='text-2xl my-5 font-bold'>Login</h4>
            <input type="text" placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} className='input-box' />
            <PasswordInput value={password} onchange={(e)=>{setPassword(e.target.value)}} />

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            <button type='submit' className='btn-primary'>{isLoading === true ? 'Loading Your Space...': 'Login'}</button>
            <p className='text-sm text-center mt-4'>Not registered yet?{""} <Link className='font-medium text-primary underline' to='/signup'>Create an Account</Link></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
