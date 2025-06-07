import { BASE_URL } from '@/utils/constants'
import { addFeed } from '@/utils/feedSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from './UserCard'
import { User } from 'lucide-react'

const Feed = () => {
    const dispatch = useDispatch()
    const users = useSelector(store=>store.feed)

  const userFeed = async()=>{
    try {
    const feed= await axios.get(BASE_URL+"/user/feed?page=1&limit=10", // get call m na dalke bhi chlega{} pr post call mai 2nd wala{} dalo hi dalo bhle hi kuch na post krre
      {withCredentials:true})
      // console.log(feed.data)

      dispatch(addFeed(feed.data))
    } catch (error) {
      // console.error(error)
    }
  }
  useEffect(()=>{
    userFeed()
  },[])
if (!users) return
if(users.length ===0) return(<h2 className=' absolute left-1/2 -translate-x-1/2 top-30 text-2xl md:text-4xl text-red-600 uppercase text-center  font-bold'>No new users found</h2>)
return (
  <div className="relative h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-gradient-to-b from-zinc-50 to-neutral-50">
    {users.map((user) => (
      
      <UserCard key={user._id} user={user}/>
    ))}

  </div>
)
}

export default Feed