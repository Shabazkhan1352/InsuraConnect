import React from 'react'
import background from '../assets/background.svg'
import { motion } from 'framer-motion'
import { fadeIn } from '../variants'


import car from '../assets/car.svg'
import electronics from '../assets/electronics.svg'
import health from '../assets/health.svg'
import life from '../assets/life.svg'
import home from '../assets/Home.svg'
import bike from '../assets/bike.svg'




const InsuraCard = ({ title, desc}) => {

   const handleImage = () => {
            switch (title) {
              case "Car Insurance":
                return <img src={car} alt="" className='text-white' />
              case "Electronics Insurance":
                return <img src={home} className='text-white  ' alt="" />
              case "Home Insurance":
                return <img src={life} className='text-white  ' alt="" />
              case "Life Insurance":
                return <img src={electronics} className='text-white  ' alt="" />
              case "Bike Insurance":
                return <img src={bike} className='text-white  ' alt="" />
              case "Health Insurance":
                return <img src={health} className='text-white  ' alt="" />
              default:
                return null;
            }
          };
  return (
    <div
    className='flex  items-end w-[387px] h-[230px] bg-white rounded-[12px] cursor-pointer'>
      <div className='p-6 pr-0 text-justify flex gap-[12px] h-full flex-col  w-[65%] '>
        <h2 className=' inter-semibold text-[24px] text-[#313131] whitespace-nowrap '>{title}</h2>
        <p className='inter-regular text-[14px] text-[#313131]/70 leading-[150%] '>{desc}</p>
        <a className='inter-regular text-[14px] text-[#313131] leading-[150%] hover:underline hover:text-[#27395C]' href="">See more</a>
      </div>
      <div className="w-[35%] " >
     {handleImage()}

      </div>

    </div>
  )
}

export default InsuraCard