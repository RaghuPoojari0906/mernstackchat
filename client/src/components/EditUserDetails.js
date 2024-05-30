import React, { useEffect, useRef, useState } from 'react'
import Avtar from './Avtar.js'
import uploadFile from '../helpers/Upload.js'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice.js'

const EditUserDetails = ({onClose, user}) => {
    const [data,setData] = useState(
        {
            name: user?.user,
            profile : user?.profile
        }
    )
    const uploadPhotoRef = useRef()
    const dispatch =useDispatch()
    useEffect(()=>{
        setData((preve)=>{
            return{
                ...preve,
                ...user,
            }
        })
    },[user])
    const handleOnchange = (e)=>{
        const {name,value}= e.target
        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }
    const handleOpenUpload = (e)=>{
        e.preventDefault()
        e.stopPropagation()
        uploadPhotoRef.current.click()
    }
    const handleUploadPic=async(e)=>{
        const file = e?.target?.files[0]
        const UploadPic = await uploadFile(file)
       
       
        setData((preve)=>{
            return{
                ...preve,
                profile : UploadPic?.url
            }
        })
    }
    
    const handleSubmit = async(e)=>{
        e.preventDefault()
        e.stopPropagation()
        try{
            const URL= "/api/update-user"
            const response = await axios({
               method : 'post',
               url : URL,
               data : data,
               withCredentials : true
            })
            toast.success(response?.data?.message)
            if(response?.data?.success){
                dispatch(setUser(response?.data?.data)) 
            }
        }catch(error){
         toast.error(error?.response?.data?.message)
        }
    }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10'>
        <div className='bg-white p-4 py-6 m-1 rounded w-full max-w-sm '>
           <h2 className='font-semibold'>Profile</h2>
           <p>Edit Profile</p>
           <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-1'>
                <label htmlFor='name'>Name:</label>
                <input type='text'
                name='name'
                id='name'
                value={data?.name}
                onChange={handleOnchange}
                className='w-full py-1 px-2 focus:outline-primary border-0.5'
                />
            </div>
            <div>
                <label htmlFor='pofile_pic'>Profile Photo
                
                <div className='my-1 flex items-center gap-4'>
                    <Avtar
                 width={40}
                 height={40}
                 imageUrl={data?.profile}
                 name={data?.name}
                />
                <button className='font-semibold ' onClick={handleOpenUpload}>Change Profile Photo</button>
                
                <input
                 type='file'
                 id='pofile_pic'
                 className='hidden'
                 onChange={handleUploadPic}
                 ref={uploadPhotoRef}
                />
            </div>
            </label>
            </div>
            
           <div className='flex gap-2 w-fit ml-auto mt-2'> 
           <button onClick={onClose} className='border-primary border px-4 py-1 rounded hover:bg-primary hover:text-white'>Cancel</button>
           <button onClick={handleSubmit} className='border-primary border px-4 py-1 rounded bg-primary text-white'>Save</button>
           </div>
           </form>
        </div>
    </div>
  )
}

export default EditUserDetails;