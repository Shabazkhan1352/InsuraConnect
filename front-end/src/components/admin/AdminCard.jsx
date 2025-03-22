import React from 'react'
import Path from '../../assets/Path.svg'
import Group from '../../assets/Group.svg'


const AdminCard = () => {
  return (
    <div>
        
        <div className='p-[16px] flex flex-col justify-between w-[256px] h-[161px] m-[10px] bg-white rounded-[14px]'>
          <div className='flex justify-between items-start'>
          <div className='flex flex-col w-[70%] justify-between items-start gap-[16px]'>
          <p className='nunito-sans font-semibold text-[#3a3e42]/70 text-[16px]'>Total User</p>
            <div className='w-[96px] h-[38px] '>
            <h1 className='nunito-sans font-bold text-[28px] '>40,689</h1>
            </div>
            

          </div>
          <div className='flex'>
          <div className='w-[60px] h-[60px] flex items-center justify-center rounded-[20px] bg-[#bfbfee]  '>
              <img src={Group} alt="Group" className='w-[32px] h-[24px]' />
            </div>

          </div>
          </div>



          <div className='w-full  flex items-center gap-[8px]'>
             <img src={Path} alt="Path" className='w-[24px] h-[24px] ' />
             <h1 className='text-[#00B69B] nunito-sans font-semibold text-[16px]'>8.5%<span className='text-[#606060] mx-[8px]'>Up from yesterday</span></h1>



              
               
            </div>


        </div>
        
      
    </div>
  )
}

export default AdminCard
