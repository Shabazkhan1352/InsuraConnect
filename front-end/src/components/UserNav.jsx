import React, { useState } from 'react'
import { Menu, X, Home, FileText, User, LogOut } from "lucide-react";

import { CiSearch } from "react-icons/ci";
import { LiaLanguageSolid } from "react-icons/lia";

import pic from '../assets/shabaz.png'

import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/sidebarSlice";

const UserNav = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.sidebar.isOpen);

    const [profile, setProfile] = useState(pic)
    return (
        <div className=' flex justify-between items-center h-[70px] w-full px-[40px] py-[16px] bg-white '>
          {/* left nav */}
          <div className='flex items-center justify-center gap-[24px] '> 
              {/* btn */}
              <div>
            <button onClick={() => dispatch(toggleSidebar())} className=" cursor-pointer text-black">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            </div>
            {/* searchbar */}
            <div className='w-[100%] h-[38px] bg-[#F5F6FA] rounded-[12px] p-[10px] flex items-center gap-[13px] '>
            <CiSearch />
            <input className=' outline-none'  placeholder='Search'  type="text" name="" id="" />
            </div>
          </div>
          {/* right nav */}
            <div className='flex items-center gap-[30px] '>
                {/* language btn */}
            <div className=' flex gap-[15px] items-center justify-between'>
            <LiaLanguageSolid  className='w-5 h-5'/>
            <select  name="language" id="">
               
                <option className='poppins-light text-[14px] outline-none' value="English">English</option>
                <option className='poppins-light text-[14px] outline-none' value="Hindi">Hindi</option>
                <option className='poppins-light text-[14px] outline-none' value="Kannada">Kannada</option>
            </select>

            </div>
            {/* user profile */}
            <div className='flex items-center gap-[15px]' >
                <div><img className=' w-[48px] h-[48px]' src={pic} alt="" /></div>
                <div className=' flex flex-col '>
                    <p className='poppins-semibold text-[14px] tracking-[0.3px]'>Shabaz khan</p>
                    <p className='text-black/70 poppins-regular text-[12px]'>User</p>
                </div>
            </div>
            </div>
        </div>
    )
}

export default UserNav