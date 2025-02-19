import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import logo from '../../public/logo2.png';
import { NavLink,useNavigate } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className='mt-2'>
        
      <div className="mynav flex justify-between items-center bg-[#D9D9D9]  h-20   rounded-lg ml-3 mr-3 p-5 ">
        
        <div className="logo "><img className='  w-[200px]' src={logo} alt="" /></div>
        <div className="navlinks">
        {[{ name: "HOME", path: "/" }, { name: "POLICIES", path: "/policies" }, { name: "RENEWAL", path: "/renewals" }, { name: "GUIDE", path: "/guide" }].map((item) => (
                  <NavLink
                    key={item.name}
                    className={({ isActive }) =>
                      `${isActive ? "text-[#153F29] bg-[#81E687] rounded-md px-3 py-2" : "text-white"} font-medium tracking-[1px] text-sm px-3 py-2`}
                    to={item.path}
                    
                  >
                    <li>{item.name}</li>
                  </NavLink>
                ))}
        </div>
        <div className="profile flex items-center justify-center scale-150">
        
        <UserButton className="  " />
        
        </div>
      </div>
    </div>
  )
}

export default Navbar