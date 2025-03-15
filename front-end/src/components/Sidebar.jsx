import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Home, FileText, User, LogOut } from "lucide-react";


import overviewIMG from '../assets/overview.svg';
import mypoliciesIMG from '../assets/mypolicies.svg';
import productsIMG from '../assets/products.svg';
import claimsIMG from '../assets/claims.svg';
import settingsIMG from '../assets/settings.svg';
import logoutIMG from '../assets/logout.svg';


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();

    const toggleSidebar = () => setIsOpen(!isOpen);

    const menuItems = [
        { name: "Overview", path: "/dashboard", icon: <img className=" hover:invert-100"  src={overviewIMG}  alt="" /> },
        { name: "My Policies", path: "/policies", icon: <img src={mypoliciesIMG}  alt="" />  },
        { name: "Products", path: "/claims", icon: <img src={productsIMG}  alt="" />  },
        { name: "claims", path: "/profile", icon: <img src={claimsIMG}  alt="" /> },
       
    ];

    const belowmenuitem = [
        { name: "Settings", path: "/settings", icon: <img src={settingsIMG}  alt="" />  },
        { name: "Logout", path: "/logout", icon: <img src={logoutIMG}  alt="" />  },
    ]

    return (
        <div className=" ">
            {/* Sidebar */}
            <div className={`flex flex-col items-center  bg-white border-r-2 border-black overflow-hidden text-black h-screen p-4 transition-all duration-300 ${isOpen ? "w-64" : "w-16" }`}
            >

                {/* logo plus toggle btn */}
                <div className={`p-2 flex justify-between items-center mb-[30px] ${isOpen ? "w-64" : "w-16 items-center justify-center" }`}>
                  <h2 className={` text-[#714FAE] nunito-sans font-extrabold text-[20px]  ${isOpen ? "" : "hidden" } `}>Insuraconnect</h2>

                  {/* Toggle Button */}
                    <button onClick={toggleSidebar} className=" cursor-pointer text-black">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>


                {/* Menu Items */}
                <ul className={`${isOpen ? "" :  "flex justify-center items-center flex-col"}`}>
                    {menuItems.map((item) => (
                        <li key={item.path} className="px-[8px] rounded-[6px]">
                            <NavLink
                                to={item.path}
                                className={`flex items-center  justify-start gap-[17px] rounded p-[15px]  ${isOpen ? "w-[192px] h-[50px]" : "w-16 items-center justify-center" }   ${location.pathname === item.path
                                        ? "bg-[#714FAE]"
                                        : "hover:bg-[#714FAE] hover:text-white"
                                    }`}
                            >
                                <span className="">{item.icon}</span>
                                {isOpen && <span className=" nunito-sans text-[14px] font-semibold">{item.name}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            
                <div className="bg-gray-200 h-[1.5px] my-[30px] w-full"></div>


                  {/* Menu Items */}
                  <ul>
                    {belowmenuitem.map((item) => (
                        <li key={item.path} className="px-[8px] rounded-[6px] ">
                            <NavLink
                                to={item.path}
                                className={`flex items-center  justify-start gap-[17px] rounded p-[15px]   ${isOpen ? "w-[192px] h-[50px]" : "w-16 items-center justify-center" } ${location.pathname === item.path
                                        ? "bg-[#714FAE]"
                                        : "hover:bg-[#714FAE] hover:text-white  "
                                    }`}
                            >
                                <span className=" ">{item.icon}</span>
                                {isOpen && <span className=" nunito-sans text-[14px] font-semibold">{item.name}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

           
        </div>
    );
};

export default Sidebar;
