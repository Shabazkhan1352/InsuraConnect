
import React, {useState} from 'react'
import Sidebar from './components/Sidebar'
import UserNav from './components/UserNav'
import reportIcon from './assets/report.svg'
import PolicyCard from './components/PolicyCard'

import { useAuth } from './AuthContext'
const Claims = () => {
  const {isAuthenticated} = useAuth()
   const [expired ,setExpired] = useState([])
    const [active ,setActive] = useState([])
  return (
    <>{isAuthenticated ?  <div className='bg-[#F5F6FA] w-full flex'>
      <Sidebar />
      <div className=' w-full flex flex-col '>


        <UserNav />


        <div className='p-[30px]'>
          <div className='flex flex-col gap-7.5'>
            <h1 className=' poppins-semibold text-[32px]'>Claims</h1>
            {/* report */}
            <div className='bg-white w-full p-6 rounded-[11px] flex gap-6.5'>
              <div className='h-10 w-10 rounded-[7px] bg-[#F3EBF2] flex justify-center items-center'><img src={reportIcon} alt="" /></div>
              <div>
                <p className='plus-jakarta-sans font-bold text-[14px] text-[#190721]/50'>Note</p>
                <p className='plus-jakarta-sans font-semibold text-[18px] leading-[150%]'>Claims are typically processed within 7–14 business days. We’ll keep you updated at each stage.</p>
              </div>
            </div>

            {/* renewable */}
            <h1 className=' poppins-semibold text-[18px]'>Renewable Policies</h1>
            <PolicyCard active= {active} setActive={setActive}/>
          <h1 className=' poppins-semibold text-[18px]'>Claimable Policies</h1>
          <PolicyCard expired={expired} setExpired={setExpired} btncolor = "#00B69B" />
          </div>

        </div>
      </div>
      </div> :<div>YOU SHOULD BE LOGGED IN TO ACCESS THIS PAGE</div>  }</>
   
      )
}

      export default Claims