import { BASE_URL } from '@/utils/constants'
import { removeUser } from '@/utils/userSlice'
import axios from 'axios'
import { motion } from 'motion/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const loggedInUser = useSelector((store)=>store.user)
  const dispatch = useDispatch()
  const handleLogOut= async()=>{
    try {
      await axios.post(BASE_URL+"/logout",{},{withCredentials:true})      
      dispatch(removeUser())
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
<div className="sticky top-0 z-50 w-full md:px-10 px-4 shadow-sm rounded-lg py-2 h-16 flex justify-between bg-neutral-50/80 backdrop-blur-lg items-center">
  {/* Your navbar content */}
 <Link to={'/'} className=' md:text-lg text-sm font-bold -rotate-12 shadow-md md:p-2 p-1 active:scale-90 hover:scale-90 duration-300 delay-100 ease-in-out rounded-lg bg-gradient-to-r from-violet-100 to-blue-100 cursor-pointer text-neutral-500'>/H00man/</Link>

   {loggedInUser&&<div className="dropdown dropdown-end">
    <span className=' md:mr-6 text-xs md:text-base font-medium text-neutral-500'>Welcome {loggedInUser.firstName}</span>
  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
    <div className="md:w-10 w-7 rounded-full">
      <img
        alt="Tailwind CSS Navbar component"
        src={loggedInUser.photoUrl} 
      />
    </div>
  </div> {/* This closing div was missing */}
  
  <ul
    tabIndex={0}
    className="menu menu-sm dropdown-content  rounded-box z-[1] mt-3 w-52 p-2 shadow text flex flex-col gap-2 bg-gradient-to-r from-gray-50 to-pink-50">
      <div className=' flex justify-between'>
      <Link
      to={'/profile'}
      className="justify-between md:text-lg text-base">
        Profile
      </Link>
        <span className="badge ml-10">New</span>
    </div>
  <Link className=' md:text-lg text-base' to={'/connections'}>Connections</Link>
  <Link className=' md:text-lg text-base' to={'/requests'}>Requests Received</Link>
  <Link className=' md:text-lg text-base' to={'/login'}
  onClick={handleLogOut}
  >Logout</Link>
  </ul>
</div>}
    </div>
  )
}

export default Navbar