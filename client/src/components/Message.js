import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Avtar from "./Avtar.js";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoChevronBackSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { FaImages } from "react-icons/fa6";
import { IoMdVideocam } from "react-icons/io";
import uploadFile from "../helpers/Upload.js";
import { IoMdClose } from "react-icons/io";
import Spinner from "./Spinner.js";
import BG from './background.jpg';
import { IoSendSharp } from "react-icons/io5";
import moment from 'moment';

const Message = () => {
  const parms = useParams();

  const socketConnection = useSelector((state) => state.user.socketConnection);
  const user = useSelector((state) => state?.user);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profile: "",
    online: false,
    _id: "",
  });

  const [openUpload, setOpenUpload] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [allMessage, setAllMessage]= useState([

  ])
  const newMessage = useRef(null)
  useEffect(()=>{
if(newMessage?.current){
newMessage?.current?.scrollIntoView({behavior : 'smooth',block : 'end'})
}
  },[allMessage])
  const handleUpload = () => {
    setOpenUpload((preve) => !preve);
  };
  const handleUploadImage = async (e) => {
    const file = e.target?.files[0];
    setLoading(true);
    const UploadPhoto = await uploadFile(file);
    setLoading(false);
    setOpenUpload(false)
    setMessage((preve) => {
      return {
        ...preve,
        imageUrl: UploadPhoto?.url,
      };
    });
  };
  const handleClearUploadImg = () => {
    setMessage((preve) => {
      return {
        ...preve,
        imageUrl: "",
      };
    });
  };
  const handleClearUploadVid = () => {
    setMessage((preve) => {
      return {
        ...preve,
        videoUrl: "",
      };
    });
  };
  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const UploadPhoto = await uploadFile(file);
    setLoading(false);
    setOpenUpload(false)
    setMessage((preve) => {
      return {
        ...preve,
        videoUrl: UploadPhoto.url,
      };
    });
  };

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message", parms?.userId);
      socketConnection.emit('seen',parms?.userId)
      socketConnection.on("message-user", (data) => {
        setUserData(data);
      })
      socketConnection.on('message',(data)=>{
        setAllMessage(data)
      })
    
    }
  }, [socketConnection, parms?.userId, user]);
  const handleChange =(e)=>{
    const {name,value}= e.target
    setMessage(preve=>{
      return{
        ...preve,
        text : value
      }
    })
  }
  const handleSendMessage=(e)=>{
    e.preventDefault()
    if(message.text || message?.imageUrl || message?.videoUrl){
      if(socketConnection){
        socketConnection?.emit('new message',{
          sender :user?._id,
          receiver : parms?.userId,
          text : message?.text,
          imageUrl : message?.imageUrl,
          videoUrl : message?.videoUrl,
          msgBy : user?._id
        })
        setMessage({
          
            text: "",
            imageUrl: "",
            videoUrl: "",
          
        })
      }
    }
  }
  return (
    <div style={{backgroundImage  :`url(${BG})`}} className="bg-no-repeat bg-cover ">
      <header className="sticky top-0 h-16 bg-white flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <Link to={"/"} className="lg:hidden">
            <IoChevronBackSharp size={25} />
          </Link>
          <div>
            <Avtar
              width={50}
              height={50}
              imageUrl={userData?.profile}
              name={userData.userData?.name}
              usersId={userData?._id}
            />
          </div>
          <div>
            <h3>{userData?.name}</h3>
            <p>{userData?.online ? "online" : "ofline"}</p>
          </div>
        </div>
        <div>
          <button className="cursor-pointer">
            {/* <BsThreeDotsVertical /> */}
          </button>
        </div>
      </header>
      <section className="h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-50">
        
        <div ref={(newMessage)} className="flex flex-col gap-2 py-2 mx-2">
          {
            allMessage?.map((msg,index)=>{
            
              return(
                <div  className={` p-1 mx-2 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-lg ${user?._id === msg.msgBy ? "ml-auto bg-teal-400" : "bg-white"}`}>
                  <div className="w-full">
                  {
                    msg?.imageUrl && (
                      <img src={msg?.imageUrl}
                      className="w-full h-full object-scale-down"
                      />
                  )
                  }
                  </div>
                  <div className="w-full">
                  {
                    msg?.videoUrl && (
                      <video src={msg?.videoUrl}
                      className="w-full h-full object-scale-down"
                      controls
                      />
                  )
                  }
                  </div>
                  <p className="px-2 ">{msg?.text}</p>
                  <p className="text-xs ml-auto w-fit">{moment(msg?.createdAt).format('hh:mm')}</p>
                  </div>
              )
            })
          }
        </div>
        {message.imageUrl && (
          <div className="w-full h-full  sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div
              onClick={handleClearUploadImg}
              className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600"
            >
              <IoMdClose size={30} />
            </div>
            <div className="bg-white p-3 ">
              <img
                src={message?.imageUrl}
                className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
              />
            </div>
          </div>
        )}
        {message?.videoUrl && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div
              onClick={handleClearUploadVid}
              className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600"
            >
              <IoMdClose size={30} />
            </div>
            <div className="bg-white p-3 ">
              <video
                src={message?.videoUrl}
                className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
                controls
                muted
                autoPlay
              ></video>
            </div>
          </div>
        )}
        {loading && (
          <div className="w-full h-full sticky bottom-0 flex justify-center items-center">
            <Spinner />
          </div>
        )}
      </section>
      <section className="h-16 bg-white flex items-center px-4  ">
        <div className="relative ">
          <button
            onClick={handleUpload}
            className="flex justify-center items-center h-10 w-10 rounded-full hover:bg-primary hover:text-white"
          >
            <FaPlus size={20} />
          </button>
          {openUpload && (
            <div className="bg-white shadow rounded absolute bottom-14 w-36 p-2">
              <form>
                <label
                  htmlFor="uploadimage"
                  className="flex items-center p-2 gap-3 hover:bg-slate-500 cursor-pointer"
                >
                  <div className="text-primary">
                    <FaImages size={18} />
                  </div>
                  <p>Image</p>
                </label>
                <label
                  htmlFor="uploadvideo"
                  className="flex items-center p-2 gap-3 hover:bg-slate-500 cursor-pointer"
                >
                  <div className="text-blue-700 ">
                    <IoMdVideocam size={18} />
                  </div>
                  <p>Video</p>
                </label>
                <input
                  type="file"
                  id="uploadimage"
                  onChange={handleUploadImage}
                  className="hidden"
                />
                <input
                  type="file"
                  id="uploadvideo"
                  onChange={handleUploadVideo}
                  className="hidden"
                />
              </form>
            </div>
          )}
        </div>
        <form className="h-full w-full flex gap-2 "onSubmit={handleSendMessage}>
       
          <input
          type="text"
          placeholder="Type something..."
          className="py-1 px-4 outline-none w-full h-full"
          value={message?.text}
          onChange={handleChange}
          />
          <button className="text-primary hover:text-secondary">
          <IoSendSharp size={25}/>
          </button>
      
        </form>
       
      </section>
    </div>
  );
};

export default Message;
