import React from 'react'
import logo from '../assets/logo.svg'

const Login = () => {
  return (
    <div className=' bg-linear-to-r from-[#000000] to-[#002063] w-full h-screen flex justify-center items-center flex-col'>

        <div><img className='mb-6 w-[400px]' src={logo} alt="" /></div>

        {/* center div */}
     <div className=' w-[450px] h-[500px] bg-white/30 rounded-[10px] p-12 flex flex-col justify-between gap-[20px]'>
    <div> 
        <h1 className='text-4xl text-white anta-regular font-normal '>Sign In</h1>
   
    </div>

     <form action="" className=' w-full flex flex-col gap-5 ' >
        <input type="text" placeholder='username' name="" id="" className='text-[16px] p-4 rounded-[9px] bg-white text-black outline-none' />
        <input type="password" placeholder='password' name="" id="" className='text-[16px] p-4 rounded-[9px] bg-white text-black outline-none' />
        <button className=' cursor-pointer bg-[#003DBD] hover:bg-[#1900bd] w-full p-4 rounded-[9px] text-white outline-none text-[20px] tracking-[2px] anta-regular font-normal'>Login</button>
       <div>
       <p className=' text-white text-center text-[16px]'>Don't have an account? <a href="/signup" className='text-[#000D28] cursor-pointer hover:underline outline-none'>Signup</a></p>
        <p className='text-center cursor-pointer'><a className=' text-[#000D28] hover:underline'>forgot password?</a></p>
     
       </div>
     </form>
     <div className=' '>
       
     </div>

     </div>


    </div>
  )
}

export default Login