import React, { useState } from 'react'
import logo from '../assets/logo2.svg'
import logo1 from '../assets/signup.png'
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../AuthContext';


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

const {login} = useAuth()
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        phone,
        password,
      });



      setMessage("Login successful!");
      setError("");

      // Call login function from AuthContext
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", email);

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
      <div className="flex h-screen bg-gray-100">
        {/* Left Side - Image */}
        <div className="hidden relative md:flex w-[35%] bg-cover bg-center" style={{ backgroundImage: `url(${logo1})` }}></div>

        {/* Right Side - Form */}
        <div className="w-full h-screen md:w-[75%] flex items-center absolute top 1/2 left-1/2 transform -translate-x-1/4 -translate-y-1/2justify  rounded-l-[40px] overflow-hidden">
          <div className="w-full  bg-white p-8 rounded-lg shadow-lg">
            <div><img className=' mx-[265px]' src={logo} alt="" /></div>

            <h3 className="text-xl mr-[50px] mt-2 font-semibold text-center ">Create Account</h3>

            <div className="mt-4 h-8 flex ml-40 ">
              <button className="flex items-center mx-3 justify-center w-[30%] py-2 border rounded-md shadow-sm text-gray-700 border-gray-300 hover:bg-gray-100">
                <FcGoogle />

                <div className="mr-2" /> Continue with Google
              </button>
              <button className="flex  items-center justify-center w-[30%] py-2 border rounded-md shadow-sm text-gray-700 border-gray-300 hover:bg-gray-100">
                < SiGithub />

                <div className="mr-2" /> Continue with Github
              </button>
            </div>

            <div className="my-4 mr-[65px] relative text-center text-gray-500">- OR -</div>

            <form onSubmit={handleSignup} className="space-y-4 w-[60%] mx-[135px] items-center justify-center">
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Username" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Phone" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <button value="" type="submit" className="w-full bg-purple-700 text-white p-3 rounded-md hover:bg-purple-800">Create Account</button>
            </form>

            <p className="mt-2 mr-[70px] text-center text-gray-600">Already have an account? <a href="/login" className="text-purple-700 hover:underline font-semibold">Login</a></p>
          </div>
        </div>
      </div>
    </>


  )
}

export default Signup



