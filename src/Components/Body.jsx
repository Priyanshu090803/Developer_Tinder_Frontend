import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '@/utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '@/utils/userSlice'

const Body = () => {  // hmara abhi tak refresh krne m feed page khulri thi even we having tokens.
                      // to ab jab hamare pas token honge to tab hi feed page m jaenge wrna login page mai.
  const [error,SetError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const UserData = useSelector(store=>store.user)
  const fetchUser = async()=>{
    if(UserData)return
    try{
     const res = await axios.get(BASE_URL+"/profile/view",{
      withCredentials:true
    })
    dispatch(addUser(res.data))
    
  }catch(err){
   navigate("/login")
  }

  }
  useEffect(()=>{
    fetchUser()
  },[])
  // if(error){
  //   return<Error/>
  // }
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Body