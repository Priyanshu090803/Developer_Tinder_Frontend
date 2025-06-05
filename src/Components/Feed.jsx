import { BASE_URL } from '@/utils/constants'
import { addFeed } from '@/utils/feedSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Feed = () => {
    const dispatch = useDispatch()
    const users = useSelector(store=>store.feed)

  const userFeed = async()=>{
    try {
    const feed= await axios.get(BASE_URL+"/user/feed?page=1&limit=10", // get call m na dalke bhi chlega{} pr post call mai 2nd wala{} dalo hi dalo bhle hi kuch na post krre
      {withCredentials:true})
      console.log(feed.data)

      dispatch(addFeed(feed.data))
    } catch (error) {
      // console.error(error)
    }
  }
  useEffect(()=>{
    userFeed()
  },[])

return (
  <div className="relative h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-gradient-to-b from-zinc-50 to-neutral-50">
    {users.map((user) => (
      <div 
        key={user.id}
        className="h-full w-full flex items-center justify-center snap-start p-4"
      >
        {/* Card Container */}
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-amber-100 transition-all duration-500 hover:shadow-2xl pb-10">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-200 to-pink-300"></div>
          
          {/* Image Container */}
          <div className="h-64 w-full bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center p-6">
            <img
              className="h-full w-auto object-contain rounded-lg shadow-md transition-transform duration-700 hover:scale-105"
              src={user.photoUrl}
              alt={`${user.firstName}'s profile`}
              onError={(e) => {
                e.target.src = 'https://placehold.co/600x400?text=Human+Connection';
              }}
            />
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-rose-900">{user.firstName} {user.lastName}</h3>
                <p className="text-amber-700">{user.email}</p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800 border border-amber-200">
                {user.gender || 'New Member'}
              </span>
            </div>
            <p className="text-gray-600 italic">{user.about}</p>
            
            <div className="flex space-x-4">
              <button className=" cursor-pointer flex-1 bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-500 hover:to-rose-500 text-white py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                Send Hug
              </button>
              <button className=" cursor-pointer flex-1 border-2 border-amber-300 text-amber-700 hover:bg-amber-50 py-3 px-6 rounded-full transition-all duration-300">
                Whisper
              </button>
            </div>
          </div>

          {/* Connection dots */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-red-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
)
}

export default Feed