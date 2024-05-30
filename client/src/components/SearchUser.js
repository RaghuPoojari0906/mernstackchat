import React, { useEffect, useState } from 'react';
import { ImSearch } from "react-icons/im";
import Spinner from './Spinner.js';
import UserCard from './UserCard.js';
import toast from 'react-hot-toast';
import axios from 'axios';
import { IoMdClose } from "react-icons/io";

const SearchUser = ({onClose}) => {
    const [searchUser,setSearchUser]= useState([])
    const [loading,setLoading] = useState(true)
    const [search,setSearch] = useState("")

    const handleSearch = async()=>{
        const URL= "/api/search-user"
       try{
        setLoading(true)
        const response = await axios.post(URL,{
            search : search
        })
        setLoading(false)
     setSearchUser(response?.data?.data)
       }catch(error){
       toast.error(error?.response?.data?.message)
       } 
    }
    useEffect(()=>{
handleSearch()
    },[search])
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2 z-10'>
    <div className='w-full max-w-md mx-auto mt-10 '>
    <div className='bg-white rounded h-14 overflow-hidden flex'>
        <input 
        type='text'
        placeholder='Search user by name,email...'
        className='w-full outline-none py-1 h-full px-4'
        onChange={(e)=>setSearch(e.target?.value)}
        value={search}
        />
        <div className='h-16 w-14 flex justify-center items-center'><ImSearch  size={20}/></div>
    </div>
    <div className='bg-white mt-2 w-full p-4 rounded'>
      {
        searchUser.length === 0 && !loading && (
            <p className='tex-center text-slate-500'>No user found</p>
        )
      }
      {
        loading && (
           <p><Spinner/></p> 
        )
        
      }
      {
        searchUser.length !==0 && !loading && (
            searchUser?.map((user,index)=>{
              return(
                <UserCard key={user?._id} user={user} onClose={onClose}/> 
              )
               
            })
        )
      }
    </div>
    </div>
    <div className='absolute top-0 right-0 text-2xl p-2 lg:text-4xl hover:text-white' onClick={onClose}>
      <button><IoMdClose 
      size={25}/></button>
      </div>
    </div>
  )
}

export default SearchUser;