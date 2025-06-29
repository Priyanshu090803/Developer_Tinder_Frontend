import { BASE_URL } from '../utils/constants'
import { removeUserFromFeed } from '../utils/feedSlice'
import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'

const UserCard = ({user}) => {
  const dispatch = useDispatch()
   const handleSendRequest =async(status,_id)=>{ 
    try {
      const res = await axios.post(BASE_URL+"/sendConnectionReq/send/"+status+"/"+_id,{},{
        withCredentials:true
      })
      dispatch(removeUserFromFeed(_id))
    } catch (error) {
      console.log(error)
    }
  }
    const {firstName,lastName,photoUrl,age,gender,about,skills} = user
      const skillsArray = typeof skills === 'string' ? 
        skills.split(',').map(skill => skill.trim()) : 
        Array.isArray(skills) ? skills : []

  return (
   <div className="h-full w-full flex items-center justify-center snap-start p-4">
      {/* Card Container */}
      <div className="relative h-[80%] w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-amber-100 transition-all duration-500 hover:shadow-2xl flex flex-col">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-200 to-pink-300"></div>
        
        {/* Image Container */}
        <div className="h-1/2 w-full bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center p-4">
          <img
            className="h-full w-auto object-contain rounded-lg shadow-md transition-transform duration-700 hover:scale-105"
            src={photoUrl}
            alt={`${firstName}'s profile`}
            onError={(e) => {
              e.target.src = 'https://placehold.co/600x400?text=Human+Connection';
            }}
          />
        </div>

        {/* Content */}
        <div className="px-5 py-2 space-y-2 flex-wrap flex-col flex-1 overflow-y-auto scrollbar-hide">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-rose-900">{firstName} {lastName}</h3>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800 border border-amber-200">
              {gender || 'New Member'}
            </span>
          </div>
          <p className="text-green-600 text-sm italic">{age}</p>
          <p className="text-neutral-400 text-sm italic">{about}</p>
          
          {/* Skills Section with Flex Wrap */}
          <div className="space-y-1    ">
            <p className="text-gray-700 text-lg font-medium">Skills:</p>
            <div className="flex flex-wrap gap-4 ">
              {skillsArray.length > 0 ? (
                skillsArray.map((skill, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-lg text-sm font-medium bg-gradient-to-r from-amber-50 to-rose-50 text-amber-800 border border-amber-200 hover:from-amber-100 hover:to-rose-100 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm italic">No skills listed</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <div className="p-4 border-t border-amber-100">
          <div className="flex justify-center md:gap-20 gap-10">
            <button 
              onClick={()=>handleSendRequest("interested",user._id)}
              className="cursor-pointer text-sm md:text-lg  bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-500 hover:to-rose-500 text-white py-1 px-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Interested
            </button>
            <button 
              onClick={()=>handleSendRequest("rejected",user._id)}
              className="cursor-pointer text-sm md:text-lg  border-2 border-amber-300 text-amber-700 hover:bg-amber-50 py-1 px-2 rounded-lg transition-all duration-300"
            >
              Ignore
            </button>
          </div>
        </div>

        {/* Connection dots */}
        <div className="absolute md:bottom-12 bottom-14 right-4 flex space-x-1 ">
          {[...Array(3)].map((_, i) => (
            <div key={i} className=" w-1 h-1  rounded-full bg-red-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserCard