import React from 'react'
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
  <footer className="w-full py-4 gap-2 items-center px-2 md:px-4 bg-gray-100 opacity-90 fixed bottom-0 left-0 right-0 z-50 flex justify-around text-neutral-700">   
  <p className=' md:text-base text-xs '>Where humans make real connection...</p>
    <div className=' flex md:gap-4  gap-2 pr-3 md:pr-0'>
      <IoLogoInstagram className=' md:text-2xl text-base text-black cursor-pointer'/>
      <RiTwitterXLine className=' md:text-2xl text-base text-black cursor-pointer'/>
      <FaFacebook className=' md:text-2xl text-base text-black cursor-pointer'/>
</div>
    <p  className=' md:text-base text-xs '>Copyright © {new Date().getFullYear()} - All right reserved </p>
</footer>
  )
}

export default Footer