import { addConnections } from '../utils/connectionSlice'
import { BASE_URL_PRODUCTION } from '../utils/constants'
import axios from 'axios'
import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Connections = () => {
  const dispatch = useDispatch()
  const userConnections = useSelector(store=>store.connections)
  const getConnections=async()=>{
    try{
      const res= await axios.get(BASE_URL_PRODUCTION+"/user/connections",{
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
    <div className=' h-screen   overflow-y-scroll w-full flex flex-col items-center py-10 mb-16'>
      <h3 className=' text-2xl md:text-4xl text-neutral-500 font-bold '>Your Connections</h3>
    <div className='  h-full w-full   gap-10 flex-wrap md:p-10 px-2  justify-center  flex-col'>    {
    userConnections.map((items)=>{
      console.log(items)
      const{firstName,lastName,photoUrl,gender,about,_id} = items;
      
      return(
      <div
      key={_id}
      className=' border  p-2 rounded-lg border-neutral-300 shadow-lg flex md:flex-row flex-col  gap-2 my-4 hover:scale-105 duration-500 delay-300 ease-in-out cursor-pointer items-center justify-between md:px-10 px-2'>
        <div className=' md:flex-col flex-row flex gap-4 '>
        <img
        alt='connections'
        src={photoUrl}
        className=' w-16 h-16 object-cover rounded-2xl shadow-lg'
        />
        <p className='  italic text-base text-neutral-600 md:mt-0 mt-4'>{about}</p>
        </div>
        <div className=' flex md:gap-32  gap-20 mt4'>
        <p className=' md:text-lg text-neutral-600 font-semibold'>{firstName} {lastName}</p>
        <p className=' md:text-lg text-neutral-600 italic'>{gender}</p>
      </div>
        <Link to={'/chat/'+_id}>
        <button className=' cursor-pointer hover:scale-95 active:scale-95 duration-200 ease-in-out  bg-blue-700 shadow-md  shadow-blue-300 w-16  rounded-lg text-white px-2 py-1 md:text-lg md:ml-0 -ml-30'>Chat</button>
        </Link>
      </div>

      )
    })    
    }
    </div>

    </div>
  )
}

export default Connections