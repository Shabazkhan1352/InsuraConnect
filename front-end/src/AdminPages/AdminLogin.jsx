import React, { useState } from 'react'
import logo from '../assets/logo2.svg'
import logo1 from '../assets/login.png'
import bgImg from '../assets/adminbg.png'
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../AuthContext'


import axios from 'axios';



const AdminLogin = () => {

    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  

  const {login  }= useAuth()
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    
   

    try {
      const response = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password
      });
      console.log("running")

      

      

      login(response.data.token,response.data.role,response.data.name)

      

      setMessage("Login successful!");
      setError("");

      // Call login function from AuthContext
     

      // Navigate to home page
      navigate("/adminpanel");
    } catch (err) {
      setError("Invalid username or password");
      setMessage("");
    }
  };

    


  return (
        <>
        
        <div style={{ backgroundImage: `url(${bgImg}) `}} className="flex justify-center h-screen items-end  bg-gray-100 ">
          {/* Left Side - Image */}
          
          
          {/* Right Side - Form */}
          <div className=" ">
            <div className="flex flex-col gap-[20px]  py-[80px] w-full  rounded-[14px]   bg-white  shadow-lg">
               <div><img className=' mx-auto ' src={logo} alt="" /></div> 
              
              <h3 className="poppins-semibold text-[42px] font-semibold text-center ">Hey Admin </h3>
              
              
             
    
              <form onSubmit={handleAdminLogin}  className=" w-[60%] mx-auto   ">
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="username" className="poppins-medium text-[18px] w-full mt-4 p-3 border-b-2 bg-white border-b-gray-200 rounded-md outline-none " />
                <input value={phone} onChange={(e)=>setPhone(e.target.value)} type="text" placeholder="phone" className="poppins-medium text-[18px] w-full mt-4 p-3 border-b-2 bg-white border-gray-200 rounded-md outline-none " />
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="email" className=" poppins-medium text-[18px] w-full mt-4 p-3 border-b-2 bg-white border-gray-200 rounded-md outline-none " />
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className=" poppins-medium text-[18px] w-full mt-4 p-3 border-b-2 bg-white border-gray-200 rounded-md outline-none" />
                <input  type="submit" value="Login In" className="poppins-semibold text-[16px] w-full bg-purple-700 text-white mt-4 p-3 font-extrabold rounded-md hover:bg-purple-800 cursor-pointer"/>
              </form>
              <div className=" flex justify-between w-[60%] mx-auto gap-17  ">
              <p className="mt-2 poppins-regular text-[16px]   text-gray-600">New here? <a href="/Signup" className="text-purple-700 hover:underline font-semibold">Signup</a></p>
              <p className="mt-2 poppins-regular text-[16px]  text-gray-600">Login as an <a href="/login" className="text-purple-700 hover:underline font-semibold">User</a></p>
              </div>
            </div>
          </div>
        </div>
        </>
  )
}

export default AdminLogin