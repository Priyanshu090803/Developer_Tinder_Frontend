import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import {  Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL_PRODUCTION } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {  // hmara abhi tak refresh krne m feed page khulri thi even we having tokens.
                      // to ab jab hamare pas token honge to tab hi feed page m jaenge wrna login page mai.
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const UserData = useSelector(store=>store.user)
  const fetchUser = async()=>{
    try{ 
    if(UserData)return
     const res = await axios.get(BASE_URL_PRODUCTION+"/profile/view",{
      withCredentials:true
    })
    dispatch(addUser(res.data))
  }catch(err){
   navigate("/login")
  }
  
  }
  useEffect(()=>{
    if (!UserData) {
      fetchUser()
    }
  },[UserData])

  return (
    <div className=' h-screen w-full overflow-y-auto scrollbar-hide'>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body