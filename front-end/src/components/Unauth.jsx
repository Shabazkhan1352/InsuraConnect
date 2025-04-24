import React from 'react'
import { useNavigate } from 'react-router-dom'

const Unauth = () => {
    const navigate = useNavigate()
  return (
    <div className='flex items-center justify-center flex-col min-h-[100vh] gap-5'>

    <div>YOU SHOULD BE LOGGED IN MOVE TO THIS PAGE</div>
    <div className='flex items-center gap-5'>
    <button onClick={()=>{navigate('/')}} className='cursor-pointer  text-white text-[14px] inter-bold font-bold  bg-[#714FAE] tracking-[2px]  rounded-[9px]   w-[170px] h-[50px] '>RETURN TO HOME</button>

    <button onClick={()=>{navigate('/login')}} className='cursor-pointer  text-white text-[14px] inter-bold font-bold  bg-[#714FAE] tracking-[2px]  rounded-[9px]   w-[119px] h-[50px] '>LOGIN HERE</button>
    </div>
    </div>

    
  )
}

export default Unauth