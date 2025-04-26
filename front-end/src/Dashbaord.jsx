import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import UserNav from './components/UserNav'
import PolicyCard from './components/PolicyCard'


import reportIcon from './assets/report.svg'
import Carousel from './components/Carousel'
import {useAuth} from './AuthContext'

const Dashbaord = () => {
 

  const {isAuthenticated} = useAuth()
  return (
    <>
    {isAuthenticated ?  <div className='bg-[#F5F6FA] w-full flex   '>

<Sidebar />
{/*  */}
<div className='flex w-full flex-col'>
  <div><UserNav /> </div>
  {/* text div */}
  <div className=' p-[30px]' >
    <div className='flex flex-col gap-7.5'>
      <h1 className=' poppins-semibold text-[32px]'> Hello, Shabaz</h1>
      {/* report */}
      <div className='bg-white w-full p-6 rounded-[11px] flex gap-6.5'>
        <div className='h-10 w-10 rounded-[7px] bg-[#F3EBF2] flex justify-center items-center'><img src={reportIcon} alt="" /></div>
        <div>
          <p className='plus-jakarta-sans font-bold text-[14px] text-[#190721]/50'>Report</p>
          <p className='plus-jakarta-sans font-semibold text-[18px] leading-[150%]'>Your insurance overview is ready. Manage policies, track claims, and stay updated—all in one place.</p>
        </div>
      </div>
      {/* My isnurance */}
      <h1 className=' poppins-semibold text-[18px]'>My Insurance</h1>
      <div><PolicyCard /></div>
      {/* Recommendation */}
      <h1 className=' poppins-semibold text-[18px]'>Recommended Policy</h1>
      {/* external code */}
      <div>

<Carousel/>
        

      </div>
    </div>
  </div>
</div>


</div> :<div>YOU SHOULD BE LOGGED IN TO ACCESS THIS PAGE</div>  }
   
    </>
  )
}

export default Dashbaord