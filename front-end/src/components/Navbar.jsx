import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import logo from '../../public/logo2.png';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className='mt-2'>
        
      <div className="mynav flex justify-between items-center bg-[#D9D9D9]  h-20   rounded-lg ml-3 mr-3 p-5 ">
        
        <div className="logo "><img className='  w-[200px]' src={logo} alt="" /></div>
        <div className="navlinks">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/policies">Polcies</NavLink>
        <NavLink to="/renewals">Renewals</NavLink>
        <NavLink to="/guide">Guide</NavLink>
        </div>
        <div className="profile flex items-center justify-center scale-150">
        
        <UserButton className="  " />
        
        </div>
      </div>
    </div>
  )
}

export default Navbar