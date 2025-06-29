import { BASE_URL } from '../utils/constants'
import { createSocketConnection } from '../utils/socket'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Chat = () => {
    const { targetUserId } = useParams()
    const [newMessages, setNewMessages] = useState("")
    const [messages,setMessages] = useState([])
    const [socket, setSocket] = useState(null);

    const user = useSelector(store=>store.user)
    const userId = user?._id
    const firstName = user?.firstName
    
    const fetchMessages= async()=>{
      const chat = await axios.get(BASE_URL+"/chat/"+targetUserId,{
        withCredentials:true
      })
    const chatMessages= chat?.data?.messages.map((msg)=>{
      const{senderId,text}=msg
      return{
         firstName:senderId?.firstName,
         lastName:senderId?.lastName,
         photoUrl: senderId?.photoUrl,
         text 
      } 
    })
    setMessages(chatMessages)
    }

    useEffect(()=>{
      fetchMessages()
    },[])
    
   useEffect(()=>{
    const socket =createSocketConnection()
    socket.emit("joinChat",{firstName,userId,targetUserId})  //'joinchat same as backend' dono user ka socket bnare
    
    socket.on('messageRecieved',({firstName,text})=>{  // listening to messageRecieved event
      setMessages((messages)=>[...messages,{firstName,text}])  // previous state k msg bhi use krne hai
    })   
    setSocket(socket)
    return()=>{
      socket.disconnect() // unmounting
    }
   },[userId,targetUserId])
   const sendMessage = ()=>{    // function for sending messages
    const socket = createSocketConnection()
    socket.emit("sendMessage",{          // socket.emit is for sending purpose
      firstName,
      userId,
      targetUserId,
      text:newMessages
    })
     setNewMessages("")    
   }

  return (
    <div className=' h-screen w-full flex justify-center pb-36 pt-2 px-4'>
      <div className=' chatbox border flex flex-col items-center h-full md:w-1/2 rounded-lg text-neutral-300 shadow-lg shadow-blue-200'>
        <div className=' h-full   w-full bg-gradient-to-br from-zinc-50 to-blue-50 px-2 overflow-y-scroll'>
 
{  
   messages.map((msg,index)=>{
  return(
 <div id={index} className="chat chat-start border">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={msg.photoUrl}
      />
    </div>
  </div>
  <div className="chat-header text-neutral-500">
   {msg.firstName} { msg.lastName} 
  </div>
  <div className="chat-bubble">{msg.text}</div>
</div>
  )
})
 }
 
        </div>
        <div className=' w-full flex px-3 py-2 gap-4 border border-neutral-200'>
          <input
          className=' w-full px-4 py-1 outline outline-gray-200 focus:outline-neutral-400 rounded-md text-base text-black'
          placeholder='Write your text...'
          value={newMessages}
          onChange={(e)=>setNewMessages(e.target.value)}
          />
          <button className=' cursor-pointer hover:scale-95 active:scale-95 duration-400 ease-in-out bg-black shadow-md shadow-neutral-500 px-3 text-lg rounded-lg font-medium text-white'
          onClick={sendMessage}
          >Send</button>
        </div>
      </div>
    </div>
  )
}

export default Chat