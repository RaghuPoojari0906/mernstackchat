import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/Upload.js';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
    const [data,setData] = useState({
        name : "",
        email : "",
        password : "",
        profile : ""
    })
    const [UploadPic, setUploadPic]= useState("")
    const navigate = useNavigate()
    const handleUploadPic=async(e)=>{
        const file = e.target?.files[0]
        const UploadPic = await uploadFile(file)
       
        setUploadPic(file)
        setData((preve)=>{
            return{
                ...preve,
                profile : UploadPic.url
            }
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        e.stopPropagation()
    

const URL= "/api/register"

try{
const response = await axios.post(URL,data)
toast.success(response?.data?.message)
if(response.data.success){
    setData({
        name : "",
        email : "",
        password : "",
        profile : ""
    })
navigate('/email')
}
console.log(response)
}catch(error){
    toast.error(error?.response?.data?.message)
    console.log(error)
}
}
    const handleOnchange = (e)=>{
        const {name, value}= e.target
        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }
    const handleClearUpload=(e)=>{
       setUploadPic(null)
       e.preventDefault()
       e.stopPropagation()
       console.log(data);
    }
 
  return (
    <div className='mt-5'>
        <div className='bg-white w-full max-w-sm my-2 rounded overflow-hidden p-4 m-2 mx-auto'>
            <h2>Welcome to Chat app</h2>
        
        <form className='grid gap-4' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-1'>
                <label htmlFor='name'>Name: </label>
                <input type='text'
                id='name' name='name'
                placeholder='Enter Your Name'
                className='bg-slat-100 px-2 py-1 focus:outline-primary'
                value={data.name}
                onChange={handleOnchange}
                required
                />
            </div>
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
            <div className='flex flex-col gap-1'>
                <label htmlFor='name'>Password: </label>
                <input type='text'
                id='password' name='password'
                placeholder='Enter Your Password'
                className='bg-slat-100 px-2 py-1 focus:outline-primary'
                value={data.password}
                onChange={handleOnchange}
                required
                />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor='profile'>Profile Picture:
                <div className='h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer'>
                    <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>{
                        UploadPic?.name ? UploadPic?.name :"Upload Profile Pic"
                        
                    }</p>
                    {
                        UploadPic?.name && (
                            <button className='text-lg ml-2 hover:text-red-600' onClick={handleClearUpload}>
                            <IoClose />
                            </button>
                        )
                    }
                    
                </div>
                 </label>
                <input type='file'
                id='profile' name='profile'
                className='bg-slat-100 px-2 py-1 focus:outline-primary hidden'
                onChange={handleUploadPic}
                
                />
            </div>
           <button className='bg-primary text-lg px-4 py-1 hover:bg-secondary mt-2  text-white leading-relaxed tracking-wide'>
            Register
           </button>
        </form>
        <p className='my-3 text-center'>Alredy have account ? <Link to={"/email"} className='hover:text-primary font-semibold hover:underline'>Login</Link></p>
        </div>
    </div>
  )
}

export default Register