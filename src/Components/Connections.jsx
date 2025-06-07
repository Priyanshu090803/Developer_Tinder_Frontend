import { addConnections } from '@/utils/connectionSlice'
import { BASE_URL } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Connections = () => {
  const dispatch = useDispatch()
  const userConnections = useSelector(store=>store.connections)
  
  const getConnections=async()=>{
    try{
      const res= await axios.get(BASE_URL+"/user/connections",{
      withCredentials:true
    })
    
    dispatch(addConnections(res.data.data))
    // console.log(res.data.data)

  }
    catch(err){
      console.log(err)    
    }
  }
  useEffect(()=>{
    getConnections()
  },[])
  if(!userConnections) return
  if(userConnections.length===0) return (<h2 className=' absolute left-1/2 -translate-x-1/2 top-30 text-2xl text-red-600 uppercase text-center  font-bold'>No Connections</h2>)
  return (
    <div className=' h-full w-full flex flex-col items-center py-10'>
      <h3 className=' text-2xl md:text-4xl text-neutral-500 font-bold '>Your Connections</h3>
    <div className='  h-full w-full md:flex gap-10 flex-wrap p-10  justify-center md:flex-row flex-col'>    {
    userConnections.map((items)=>{
      console.log(items)
      const{firstName,lastName,photoUrl,gender,about} = items;
      
      return(
      <div className=' border p-2 rounded-lg border-neutral-300 shadow-lg flex flex-col gap-2 my-4 hover:scale-105 duration-500 delay-300 ease-in-out cursor-pointer'>
        <img
        alt='connections'
        src={photoUrl}
        className=' w-52 rounded-2xl shadow-lg'
        />
        <p className=' text-lg text-neutral-600 font-semibold'>{firstName} {lastName}</p>
        <p className=' text-lg text-neutral-600'>{gender}</p>
        <p className='  italic text-base text-neutral-600'>{about}</p>
      </div>
      )
    })    
    }
    </div>

    </div>
  )
}

export default Connections