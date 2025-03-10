import React from 'react'
import background from '../assets/background.svg'

const InsuraCard = ({title,desc,image}) => {
  return (
    <div className='flex  items-end w-[387px] h-[230px] bg-white rounded-[12px] cursor-pointer'>
        <div className='p-6 pr-0 text-justify flex gap-[12px] h-full flex-col  w-[65%] '>
        <h2 className=' inter-semibold text-[24px] text-[#313131] whitespace-nowrap '>{title}</h2>
        <p className='inter-regular text-[14px] text-[#313131]/70 leading-[150%] '>{desc}</p>
        <a className='inter-regular text-[14px] text-[#313131] leading-[150%] hover:underline hover:text-[#27395C]' href="">See more</a>
        </div>
        <div className="w-[35%] " >
        <img src={image} className='text-white  ' alt="" />
        
        </div>
       
    </div>
  )
}

export default InsuraCard