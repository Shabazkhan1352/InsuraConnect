import React, { useState, useEffect } from "react";
import { IoMdStar } from "react-icons/io";
import logo from '../assets/cardbg.png'

const Feedback = ({ stars, desc, profilepic, username, role }) => {
  const [starIcons, setStarIcons] = useState([]);

  useEffect(() => {
    
    setStarIcons(Array(stars).fill(<IoMdStar /> ));
  }, [stars]);

  return (
    <div  className=' w-[386px] h-[267px] p-6 flex justify-between inter-regular flex-col  text-white  rounded-[12px]  bg-[#714FAE] '>
      <div className="flex gap-[10px] text-3xl ">
        {starIcons.map((item, index) => (
          <span className="" key={index}>{item}</span>
        ))}
      </div>

      <p className="mt-2 text-white/70 text-[14px]  w-[85%]">{desc}</p>
      <div className="flex items-center mt-2 gap-2">
        <img src={profilepic} alt="Profile" className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-bold">{username}</p>
          <p className="text-sm text-white/60">{role}</p>
         
        </div>
      </div>
    </div>
  );
};

export default Feedback;
