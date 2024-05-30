import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Avtar from '../components/Avtar.js';
import { useDispatch } from 'react-redux';
import { setToken} from '../redux/userSlice.js';

const CheckPassword = () => {
    const [data,setData] = useState({
        password : "",
        usersId : ""  
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
  
    useEffect(()=>{
     
        if(!location?.state?.name){
          navigate('/email')
       
        }
      
    },[])
    const handleOnchange = (e)=>{
      const {name, value}= e.target
      setData((preve)=>{
          return{
              ...preve,
              [name] : value,
              
          }
      })
  }
   
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        e.stopPropagation()
    



try{
    
const response = await axios({
    method : 'post',
    url : `api/password`,
    data : {
        usersId : location?.state?._id,
        password : data?.password
    },
   withCredentials : true
})

toast.success(response?.data?.message)
if(response?.data?.success){
    dispatch(setToken(response?.data?.token))
    localStorage.setItem('token',response?.data?.token)
    setData({
        password : "",  
    })
    navigate('/')
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
          <div className='w-fit mx-auto mb-2'>
          <Avtar
        name={location?.state?.name}
        imageUrl ={location?.state?.profile}
          width={70}
          height={70}    
         
          />
          </div >
          {/* <div className='w-fit mx-auto mb-4'>
          <FaUserTie
          size={80} />
         
          </div> */}
            <h2 className='text-lg'>Welcome  {location?.state?.name}</h2>
        
        <form className='grid gap-4' onSubmit={handleSubmit}>
            
            <div className='flex flex-col gap-1'>
                <label htmlFor='password'>Password: </label>
                <input type='text'
                id='password' name='password'
                placeholder='Enter Your Password'
                className='bg-slat-100 px-2 py-1 focus:outline-primary'
                value={data.password}
                onChange={handleOnchange}
                required
                />
            </div>
            
           <button className='bg-primary text-lg px-4 py-1 hover:bg-secondary mt-2  text-white leading-relaxed tracking-wide'>
            Login
           </button>
        </form>
        <p className='my-3 text-center'>Edit Email id ? <Link to={"/email"} className='hover:text-primary font-semibold hover:underline'>Click Here</Link></p>
        </div>
    </div>
  )
}

export default CheckPassword;