import React, { useState, useEffect } from 'react'
import logo from '../assets/logo2.svg'
import logo1 from '../assets/login.png'
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import axios from 'axios';
import Loader from './Loader';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false)
  const { login } = useAuth();
  const navigate = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Simple form validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Basic email pattern check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://insuraconnect.onrender.com/auth/login", {
        email,
        password,
      });

      setMessage("Login successful!");
      setError("");

      localStorage.setItem("email", response.data.email);
      login(response.data.token, response.data.role, response.data.name);
      navigate("/userpanel");
    } catch (err) {
      setError("Invalid username or password");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    // Check if token is present in URL after OAuth login
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");


    if (token) {
      localStorage.setItem("token", token);
      login(token, "user", "OAuth User");
      navigate("/userpanel");
    }
  }, []);

  //for github and google login
  const handleOAuthLogin = (provider) => {
    window.location.href = `https://insuraconnect.onrender.com/auth/${provider}`;
  };






  return (
    <>
      {loading ? <Loader /> : <div className="flex h-screen bg-gray-100">
        {/* Left Side - Image */}
        <div className="hidden relative md:flex w-[35%] bg-cover bg-center" style={{ backgroundImage: `url(${logo1})` }}></div>

        {/* Right Side - Form */}
        <div className="w-full h-screen md:w-[70%] flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/4 -translate-y-1/2 justify rounded-l-[40px] overflow-hidden">
          <div className="gap-[40px] w-full h-screen flex flex-col justify-center items-center bg-white p-8 rounded-lg shadow-lg">
            <div className='flex flex-col items-center justify-center'>
              <img className='w-[230px] h-[57px]' src={logo} alt="" />
              <h3 className="mt-[20px] text-3xl font-semibold text-center">Welcome Back</h3>
              <br />
              {error && <p className="text-red-600 font-medium">{error}</p>}
              {message && <p className="text-green-600 font-medium">{message}</p>}


              <div className="mt-[40px] flex gap-5">
                <button onClick={() => handleOAuthLogin('google')} className="px-[38px] py-[12px] gap-5 flex items-center justify-center border rounded-md shadow-sm text-gray-700 border-gray-300 hover:bg-gray-100">
                  <FcGoogle className='text-[28px]' />
                  <div className="" /> Continue with Google
                </button>
                <button onClick={() => handleOAuthLogin('github')} className="px-[38px] py-[12px] gap-5 flex items-center justify-center border rounded-md shadow-sm text-gray-700 border-gray-300 hover:bg-gray-100">
                  <SiGithub className='text-[28px]' />
                  <div className="" /> Continue with GitHub
                </button>
              </div>
            </div>

            <div className="relative text-center text-gray-500">- OR -</div>

            <form onSubmit={handleLogin} className="space-y-4 w-[60%] items-center justify-center">
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" className="w-full p-3 border-b border-gray-300 outline-none rounded-md" />
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-3 border-b border-gray-300 outline-none rounded-md" />
              <input
                type="submit"
                value={loading ? "Logging in..." : "Login In"}
                disabled={loading}
                className="w-full bg-purple-700 text-white p-3 font-extrabold rounded-md hover:bg-purple-800 disabled:opacity-60 disabled:cursor-not-allowed"
              />            </form>

            <div className="para flex gap-17">
              <p className="text-center text-gray-600">Don't have an account? <a href="/Signup" className="text-purple-700 hover:underline font-semibold">Signup</a></p>
              <p className="text-center text-gray-600">Login as an <a href="/adminlogin" className="text-purple-700 hover:underline font-semibold">Admin</a></p>
            </div>
          </div>
        </div>
      </div>}

    </>
  );
}

export default Login;
