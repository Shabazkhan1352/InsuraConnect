import React from 'react'

const Login = () => {
  return (

    <div className="bg-gradient-to-r from-black via-gray-800 to-blue-700 h-screen w-screen text-white">
    
      <div className=" flex flex-col justify-center items-center min-h-[50vh]">
        <div className="flex flex-col w-[35%] bg-white text-black mt-32 " >
          <h2 className=' font-bold text-2xl p-4 border-b border-black'>Login</h2>
          <form className="flex flex-col p-4 mt-5 gap-3 ">
            <input className=' p-3' type="text" name="username" id="username" placeholder='Username' />
            <input className=' p-3' type="password" name="password" id="pass" placeholder='password' />
            <label className='flex  items-center gap-2'><input className=' ' type="checkbox" name="" id="" checked='check' />Remember Me</label>
            

            <input type="submit" value="Login" />
            
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login