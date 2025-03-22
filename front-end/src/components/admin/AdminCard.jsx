import React from 'react'
import Path from '../../assets/Path.svg'
import Group from '../../assets/Group.svg'


const AdminCard = () => {
  return (
    <div>
        <h1>Dashbaord</h1>
        <div className='p-[16px] flex justify-between w-[256px] h-[161px] m-[10px] bg-[#C0D2F0] rounded-[14px]'>
          <div className='flex flex-col w-[70%] justify-between'>
          <p className='Nunito Sans-bold text-[#3a3e42] text-[16px]'>Total User</p>
            <div className='w-[96px] h-[38px] '>
            <h1 className='Nunito Sans-extrabold text-[28px] '>40,689</h1>
            </div>
            <div className='w-[209px] h-[24px] flex items-center gap-[8px]'>
             <img src={Path} alt="Path" className='w-[24px] h-[24px] ' />
             <h1 className='text-[#00B69B] Nunito Sans-bold text-[16px]'>8.5%<span className='text-[#3a3e42]'>Up from yesterday</span></h1>



              
               
            </div>

          </div>
          <div className='flex'>
          <div className='w-[60px] h-[60px] flex items-center justify-center rounded-[20px] bg-[#bfbfee]  '>
              <img src={Group} alt="Group" className='w-[32px] h-[24px]' />
            </div>

          </div>






        </div>
      
    </div>
  )
}

export default AdminCard
