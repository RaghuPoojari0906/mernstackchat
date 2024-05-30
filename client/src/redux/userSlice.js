import { createSlice } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';


const initialState = {
  _id : "",
  name : "",
  email : "",
  profile : "",
  token : "",
  online : [],
  socketConnection : null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   setUser : (state,action)=>{
    state._id = action?.payload?._id
    state.email = action?.payload?.email
    state.name = action?.payload?.name
    state.profile = action?.payload?.profile
    
   },
   setToken : (state,action)=>{
    state.token = action?.payload
   },
   logout : (state,action)=>{
    state._id = ""
    state.email = ""
    state.name = ""
    state.profile = ""
    state.token = ""
    state.socketConnection = null
   
   },
   setOnline : (state,action)=>{
     state.online = action?.payload
   },
   setSocketConnection : (state,action)=>{
    state.socketConnection = action?.payload
   }
  },
})


export const { setUser, setToken, logout, setOnline,setSocketConnection} = userSlice.actions

export default userSlice.reducer