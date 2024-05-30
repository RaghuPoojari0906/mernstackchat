import React, { useEffect, useRef, useState } from "react";
import { IoChatbubblesSharp } from "react-icons/io5";
import { HiUserAdd } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import Avtar from "./Avtar.js";
import { useDispatch, useSelector } from "react-redux";
import editUser from "./editUser.js";
import EditUserDetails from "./EditUserDetails.js";
import Divider from "./Divider.js";
import SearchUser from "./SearchUser.js";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaImages } from "react-icons/fa6";
import { IoMdVideocam } from "react-icons/io";
import { logout } from "../redux/userSlice.js";




const Sideebar = () => {
  const user = useSelector((state) => state?.user);
  const [userEdit, setUserEdit] = useState(false);
  const [searchUser,setSearchUser]= useState(false)
  const [allUser, setAllUser] = useState([]);
  const socketConnection = useSelector(state => state?.user.socketConnection);
  const dispatch = useDispatch()
  const navigate = useNavigate()
 

useEffect(()=>{
if(socketConnection){
  socketConnection.emit('sidebar',user._id)
  socketConnection.on('conversation',(data)=>{
    console.log(data)
  
    const converData = data.map((conveerUser,index)=>{
      if(conveerUser?.sender._id === conveerUser?.reciver?.id){
        return{
          ...conveerUser,
          userDetails : conveerUser?.sender
        }
      }
      else if(conveerUser?.reciver?._id !== user?._id){
        return{
      ...conveerUser,
    userDetails : conveerUser?.reciver
  }

  }else{
return{
  ...conveerUser,
  userDetails : conveerUser?.sender
}
  }
      
    })

    
    
    setAllUser(converData)
  })
}
},[socketConnection,user,])

const handleLogout = ()=>{
  dispatch(logout())
  navigate("/email")
  localStorage.clear()
}

  return (
    <div  className='w-full h-full grid grid-cols-[48px,1fr] '>
      <div className=" w-12 bg-blue-200 h-full rounded-tr-lg rounded-br-lg py-5  flex flex-col justify-between">
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-400 rounded ${
                isActive && "bg-slate-400"
              }`
            }
            title="chat"
          >
            <IoChatbubblesSharp size={26} />
          </NavLink>
          <div
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-400"
            title="add members" onClick={()=>setSearchUser(true)}
          >
            <HiUserAdd size={26} />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="mx-auto"
            title={user.name}
            onClick={() => setUserEdit(true)}
          >
            <Avtar
              width={40}
              height={40}
              name={user?.name}
              imageUrl={user?.profile}
              usersId={user?._id}
            />
          </button>
          <button className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-400 rounded" onClick={handleLogout}>
            <span className="-ml-3" title="logout">
              <BiLogOut size={26} />
            </span>
          </button>
        </div>
      </div>
      <div className="w-full ">
        <div className=" h-16 flex justify-center items-center bg-teal-500 border border-black">
          <h2 className="text-xl font-bold p-4 text-slate-800 ">Chats</h2>
        </div>
        <div className=" p-[0.5px] "></div>
        <div className=" h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar bg-white">
          {
          allUser?.length === 0 && (
            <div>
              <div className="flex justify-center items-center mt-3
              ">
              <FaArrowLeftLong size={30}/>
              </div>
              
              <p className="text-lg text-center text-slate-600">Explore users to start conversation with..</p>
            </div>
          )}{
            allUser?.map((conv,index)=>{
              
              return(
                <NavLink to={"/"+ conv?.userDetails?._id} key={conv?._id} className="flex items-center gap-2 py-3 px-2 border border-transparent hover:border-primary hover:rounded  cursor-pointer">
                 <div>
                  <Avtar 
                  imageUrl={conv?.userDetails?.profile}
                  name={conv?.userDetails?.name}
                  width={40}
                  height={40}
                  />
                 
                 </div>
                 <div>
          <h3 className="text-ellipsis line-clamp-1 font-semibold  text-base ">{conv?.userDetails?.name}</h3>

          <div className="text-slate-700 text-xs flex items-center gap-1">
            <div >
              {
                conv?.lastmsg?.imageUrl && (
                  <div className="flex items-center gap-1"> <span><FaImages size={12} /></span> 
                {!conv?.lastmsg?.text && <span>Image</span>} 
                 </div>
                )
              }
               {
                conv?.lastmsg?.videoUrl && (
                  <div className="flex items-center gap-1"> <span><IoMdVideocam size={12} /></span> 
                {!conv?.lastmsg?.text && <span>Video</span> } 
                 </div>
                )
              }
            </div>
            <p className="text-ellipsis line-clamp-1">{conv?.lastmsg?.text}</p>
            
            </div>
            
        </div>
        {
         Boolean(conv?.unseenmsg) && (
            <p className="text-xs w-4 h-4 flex justify-center items-center ml-auto p-1 bg-green-600 text-primary font-semibold rounded-full">{conv?.unseenmsg}</p>
          )
        }
        
                </NavLink>
              )

              
            })
          }
              
        </div>
       
      </div>

      {userEdit && (
        <EditUserDetails onClose={() => setUserEdit(false)} user={user} />
      )}
      {
        searchUser && (
          <SearchUser onClose={()=>setSearchUser(false)}/>
        )
      }
    </div>
  );
};

export default React.memo(Sideebar);
