import React from 'react';
import { FaUserTie } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Avtar = ({usersId,name,imageUrl,width,height}) => {
  const online = useSelector(state=> state?.user?.online)
  let avatarName = ""
  if(name){
    const splitName = name?.split(" ")

    if(splitName?.length > 1){
      avatarName = splitName[0][0]+splitName[1][0]

    }else{
      avatarName = splitName[0][0]
    }
  }
 const isOnline = online?.includes(usersId)
  return (
    <div className='text-slate-800  rounded-full shaddow text-xl font-bold bg-slate-400 border relative' style = {{width : width+"px", height : height+"px"}}>
        {
          
            imageUrl ? (
                <img src={imageUrl}
                width={width}
                height={height}
                alt={name}
                className='overflow-hidden rounded-full'
                />
        ):(
            name ? (
                <div style = {{width : width+"px", height : height+"px"}} className='overflow-hidden rounded-full flex justify-center items-center'>
               
                 {avatarName}
                </div>
        ) : (
          <FaUserTie
          size={width} />
        )
    )
    
  
}
{
  isOnline && (
    <div className='w-3 h-3 bg-green-600 p-1 absolute bottom-1 -right-1 z-1 rounded-full'></div> 
  )
}
</div>
  )
}
export default Avtar;