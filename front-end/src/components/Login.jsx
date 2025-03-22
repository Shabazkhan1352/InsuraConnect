import React, { useState } from 'react'
import logo from '../assets/logo2.svg'
import logo1 from '../assets/login.png'
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../AuthContext'


import axios from 'axios';



const Login = () => {
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const {login} = useAuth()
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
   

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });
      console.log("running")

      

      localStorage.setItem("token", response.data.token);
      

      setMessage("Login successful!");
      setError("");

      // Call login function from AuthContext
     login(response.data.token)

      // Navigate to home page
      navigate("/userpanel");
    } catch (err) {
      setError("Invalid username or password");
      setMessage("");
    }
  };

    


  return (
        <>
        <div className="flex h-screen  bg-gray-100">
          {/* Left Side - Image */}
          <div className="hidden relative  md:flex w-[35%] bg-cover bg-center" style={{ backgroundImage: `url(${logo1})` }}></div>
          
          {/* Right Side - Form */}
          <div className="w-full h-screen md:w-[75%] flex items-center absolute top 1/2 left-1/2 transform -translate-x-1/4 -translate-y-1/2justify  rounded-l-[40px] overflow-hidden">
            <div className="w-full h-screen  bg-white p-8 rounded-lg shadow-lg">
               <div><img className=' mx-[265px]' src={logo} alt="" /></div> 
              
              <h3 className="text-3xl mt-5 mr-[50px] font-semibold text-center ">Welcome Back</h3>
              
              <div className="mt-6 h-8 flex ml-40 ">
                <button className="flex items-center mx-3 justify-center w-[30%] py-2 border rounded-md shadow-sm text-gray-700 border-gray-300 hover:bg-gray-100">
                <FcGoogle/>
    
                  <div className="mr-2" /> Continue with Google
                </button>
                <button className="flex  items-center justify-center w-[30%] py-2 border rounded-md shadow-sm text-gray-700 border-gray-300 hover:bg-gray-100">
                <SiGithub />                
    
                  <div className="mr-2" /> Continue with Github
                </button>
              </div>
    
              <div className="my-4 mt-4 mr-[65px] relative text-center text-gray-500">- OR -</div>
    
              <form onSubmit={handleLogin} className="space-y-4 w-[60%] mx-[135px] items-center justify-center ">
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email Address" className="w-full mt-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full mt-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                <input  type="submit" value="Login In" className="w-full bg-purple-700 text-white mt-4 p-3 font-extrabold rounded-md hover:bg-purple-800"/>
              </form>
              <div className="para flex ml-[140px] gap-17  ">
              <p className="mt-2 mr-[70px] text-center text-gray-600">Dont have an account? <a href="/Signup" className="text-purple-700 hover:underline font-semibold">Signup</a></p>
              <p className="mt-2 mr-[70px] text-center text-gray-600">Login as an <a href="#" className="text-purple-700 hover:underline font-semibold">admin</a></p>
              </div>
            </div>
          </div>
        </div>
        </>
  )
}

export default Login