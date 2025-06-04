import { motion } from 'motion/react'
import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const loggedInUser = useSelector((store)=>store.user)
  return (
<div className="sticky top-0 z-50 w-full md:px-10 px-4 shadow-sm rounded-lg py-2 h-16 flex justify-between bg-neutral-50/80 backdrop-blur-lg items-center">
  {/* Your navbar content */}
 <span className=' md:text-lg text-sm font-semibold -rotate-12 shadow-sm md:p-2 p-1 active:scale-90 hover:scale-90 duration-300 delay-100 ease-in-out rounded-lg bg-violet-100 cursor-pointer '>DevTinder/</span>

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
    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text">
    <li>
      <a className="justify-between text-lg">
        Profile
        <span className="badge">New</span>
      </a>
    </li>
    <li><a className=' text-lg'>Settings</a></li>
    <li><a className=' text-lg'>Logout</a></li>
  </ul>
</div>}
    </div>
  )
}

export default Navbar