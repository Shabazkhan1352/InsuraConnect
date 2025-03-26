import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/sidebarSlice";

import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Home, FileText, User, LogOut } from "lucide-react";


import overviewIMG from '../../assets/overview.svg';
import mypoliciesIMG from '../../assets/mypolicies.svg';
import productsIMG from '../../assets/products.svg';
import claimsIMG from '../../assets/claims.svg';
import settingsIMG from '../../assets/settings.svg';
import logoutIMG from '../../assets/logout.svg';
import { useAuth } from "../../AuthContext";





const Sidebar = () => {
    const { logout,isAuthenticated } = useAuth();
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const location = useLocation();
   



    const menuItems = [
        { name: "Overview", path: "/adminpanel", icon: <img className=" hover:invert-100" src={overviewIMG} alt="" /> },
        { name: "Manage Policies", path: "/adminpolicies", icon: <img src={mypoliciesIMG} alt="" /> },
        
        { name: " Manage claims", path: "/adminclaims", icon: <img src={claimsIMG} alt="" /> },

    ];



    return (
        <div className=" ">
           
            {/* Sidebar */}
            <div className={`flex flex-col items-center  bg-white  overflow-hidden text-black h-full p-4 transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}
            >

                {/* logo plus toggle btn */}
                <div className={`p-2  mb-[30px] ${isOpen ? "w-64" : "w-16 "}`}>
                    <h2 className={` text-[#714FAE] nunito-sans font-extrabold text-[20px] text-center tracking-[1px]  ${isOpen ? "" : "hidden"} `}>Insuraconnect</h2>

                    {/* Toggle Button */}

                </div>


                {/* Menu Items */}
                <ul className={`${isOpen ? "" : "flex justify-center items-center flex-col"}`}>
                    {menuItems.map((item) => (
                        <li key={item.path} className="px-[8px] rounded-[12px]">
                            <NavLink
                                to={item.path}

                                className={({ isActive }) =>
                                    `${isActive ? " text-white bg-[#714FAE] " : ""} flex items-center  justify-start gap-[17px] rounded-[12px] p-[15px]   ${isOpen ? "w-[192px] h-[50px]" : "w-16 items-center justify-center"}   ${location.pathname === item.path
                                        ? "bg-[#714FAE]"
                                        : "hover:bg-[#F5F6FA] hover:text-[#714FAE]"
                                    }`}
                            >
                                <span className="w-6 h-6">{item.icon}</span>
                                {isOpen && <span className=" nunito-sans text-[14px] font-semibold">{item.name}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>


                <div className="bg-gray-200 h-[1.5px] my-[30px] w-full"></div>


                {/* Menu Items */}
                <div className="flex flex-col items-center justify-center w-full p-4">
                    {/* Settings Button */}
                    <button

                        className={`   p-[15px] rounded-[12px] flex items-center hover:text-[#714FAE]  hover:bg-[#F5F6FA]  cursor-pointer
        ${isOpen ? "w-[192px] h-[50px] justify-start gap-[17px]" : "w-16 h-[50px] justify-center"}   `}
                    >
                        {/* Always Show Icon */}
                        <img className="w-6 h-6" src={settingsIMG} alt="Settings" />

                        {/* Conditionally Show Text */}
                        {isOpen && <span className="nunito-sans text-[14px] font-semibold">Settings</span>}
                    </button>

                    {/* Logout Button */}
                    <button onClick={()=>logout()}
                        className={`p-[15px] rounded-[12px] flex items-center  hover:bg-[#F5F6FA] hover:text-[#714FAE]   cursor-pointer
        ${isOpen ? "w-[192px] h-[50px] justify-start gap-[17px]" : "w-16 h-[50px] justify-center"}`}
                    >
                        {/* Always Show Icon */}
                        <img className="w-6 h-6" src={logoutIMG} alt="Logout" />

                        {/* Conditionally Show Text */}
                        {isOpen && <span className="nunito-sans text-[14px] font-semibold ">Logout</span>}
                    </button>
                </div>



            </div>


        </div>
    );
};

export default Sidebar;
