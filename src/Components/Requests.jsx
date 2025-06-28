import { BASE_URL_PRODUCTION } from '../utils/constants'
import { addRequest, removeRequest } from '../utils/requestSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Requests = () => {
  const dispatch = useDispatch()
  const requests = useSelector(store=>store.request)
 
  const reviewRequest =async(status,_id)=>{
    try {
      const res = await axios.post(BASE_URL_PRODUCTION+"/request/review/"+status+"/"+_id,
        {},
        {withCredentials:true}
      ) 
      dispatch(removeRequest(_id))
    } catch (error) {
      console.log(error)
    }
  }
  const fetchRequests=async()=>{
    try{
      const res= await axios.get(BASE_URL_PRODUCTION+"/user/request/received",{
      withCredentials:true
    })
    console.log(res.data.data)
    dispatch(addRequest(res.data.data))
  }
    catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
  fetchRequests()
  },[])
if(!requests) return
if(requests.length===0)return(<h2 className=' absolute left-1/2 -translate-x-1/2 top-30 text-2xl md:text-4xl text-red-600 uppercase text-center  font-bold'>No request pending</h2>)
 return (
  <div className='h-full w-full flex flex-col items-center py-10'>
    <h3 className='text-2xl md:text-4xl text-rose-500 font-bold uppercase'>Pending Requests</h3>
    <div className='h-full w-full md:flex gap-24 flex-wrap p-10 justify-center md:flex-row flex-col'>
      {requests.map((items) => {
        const { fromUserId } = items;
        const { firstName, lastName, photoUrl, gender, about } = fromUserId;

        return (
          
          <div 
            key={fromUserId._id} // Always add a unique key in map()
            className='
              border p-2 rounded-lg border-neutral-300 shadow-lg
              flex flex-col gap-2 my-4 hover:scale-105
              duration-500 delay-300 ease-in-out cursor-pointer
              items-center px-6 justify-between
              min-h-[400px] w-[300px] 
            '
          >
            <div className='flex flex-col items-center gap-2'>
              <img
                alt='connections'
                src={photoUrl}
                className='w-52 rounded-2xl shadow-lg'
              />
              <p className='text-lg text-neutral-600 font-semibold'>
                {firstName} {lastName}
              </p>
              <p className='text-lg text-neutral-600'>{gender}</p>
              <p className='italic text-base text-neutral-600'>{about}</p>
            </div>

            {/* Buttons pushed to the bottom */}
            <div className='flex gap-4 w-full justify-center mb-4'>
              <button className='
                border px-2 py-1 rounded-lg text-white
                cursor-pointer text-lg font-semibold hover:scale-95
                duration-300 delay-100 ease-in-out bg-emerald-600
                w-full max-w-[120px]  /* Makes buttons equal width */
              '
              onClick={()=>reviewRequest("accepted",items._id)}
              
              >
                Accept
              </button>
              <button className='
                border px-2 py-1 rounded-lg text-white
                cursor-pointer text-lg font-semibold hover:scale-95
                duration-300 delay-100 ease-in-out bg-red-600
                w-full max-w-[120px]  /* Makes buttons equal width */
              '
              onClick={()=>reviewRequest("rejected",items._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
}

export default Requests