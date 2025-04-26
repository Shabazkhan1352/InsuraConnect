import React from 'react'
import logo from '../assets/logo2.svg'
import userlogo from '../assets/user.png'
import {NavLink,useNavigate} from 'react-router-dom'

const Navbar = () => {
    const navobj = ['policies','renewals','claims','guides']
    const navigate = useNavigate()
  return (
    <div className='bg-transparent '>
       <div className='w-[80%] p-[40px] h-[137px] bg-white  rounded-b-[30px] m-auto flex  flex-row justify-between  items-center  rounded-[8px] '>
    <div onClick={()=>{navigate('/')}}><img className=' w-[230px] h-[57px]' src={logo} alt="" /></div>
    <div>
     <nav>
         <ul className='flex gap-[30px]  text-[#714FAE]'>
             {navobj.map((item)=>{
             return(
                 <div > <li className=' border-none'>
                 <NavLink className=" hover:underline border-none text-[#714FAE] inter-bold font-bold tracking-[3px] text-[14px] " to= {`/unauth`}>{item.toUpperCase()}</NavLink>
                </li></div>
                
             )
         })}</ul>
         
     </nav>
    </div>
    <div className=' flex gap-[20px]'>
     <button onClick={()=>{navigate('/login')}} className='cursor-pointer w-[119px] h-[50px] text-[14px] inter-bold border-2 font-bold tracking-[2px] rounded-[9px] border-[#714FAE]   text-[#714FAE]'>LOGIN</button>
     <button onClick={()=>{navigate('/signup')}} className='cursor-pointer  text-white text-[14px] inter-bold font-bold  bg-[#714FAE] tracking-[2px]  rounded-[9px]   w-[119px] h-[50px] '>SIGNUP</button>
    </div>

 </div></div>
   
  )
}

export default Navbar