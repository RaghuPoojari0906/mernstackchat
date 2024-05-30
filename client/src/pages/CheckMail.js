import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/Upload.js';
import { FaUserTie } from "react-icons/fa";
import axios from 'axios';
import toast from 'react-hot-toast';

const CheckEmail = () => {
    const [data,setData] = useState({
        email : "",   
    })
    
    const navigate = useNavigate()
    const handleOnchange = (e)=>{
      const {name, value}= e.target
      setData((preve)=>{
          return{
              ...preve,
              [name] : value
          }
      })
  }
   
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        e.stopPropagation()
    

const URL= `${process.env.REACT_APP_BACKEND_URL}/api/mail`

try{
const response = await axios.post(URL,data)
toast.success(response?.data?.message)
if(response?.data?.success){
    setData({
        email : "",  
    })
navigate('/password',{
    state : response?.data.data
}
)
}
console.log(response)
}catch(error){
    toast.error(error?.response?.data?.message)
    console.log(error)
}
}
   
   
 
  return (
    <div className='mt-5'>
        <div className='bg-white w-full max-w-sm my-2 rounded overflow-hidden p-4 m-2 mx-auto'>
          <div className='w-fit mx-auto mb-4'>
          <FaUserTie
          size={80} />
          </div>
          <h2 className='text-lg'>Welcome to ChatApp</h2>
        
        <form className='grid gap-4' onSubmit={handleSubmit}>
            
            <div className='flex flex-col gap-1'>
                <label htmlFor='Email'>Email: </label>
                <input type='text'
                id='email' name='email'
                placeholder='Enter Your Email'
                className='bg-slat-100 px-2 py-1 focus:outline-primary'
                value={data.email}
                onChange={handleOnchange}
                required
                />
            </div>
            
           <button className='bg-primary text-lg px-4 py-1 hover:bg-secondary mt-2  text-white leading-relaxed tracking-wide'>
            Continue
           </button>
        </form>
        <p className='my-3 text-center'>Don't have account ? <Link to={"/register"} className='hover:text-primary font-semibold hover:underline'>Register</Link></p>
        </div>
    </div>
  )
}

export default CheckEmail;