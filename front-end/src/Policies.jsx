import Sidebar from './components/Sidebar'
import React, { useState } from 'react'
import UserNav from './components/UserNav'
import PolicyCard from './components/PolicyCard'
import { useAuth } from './AuthContext'

const Policies = () => {
  const {isAuthenticated} = useAuth()
  const [expired ,setExpired] = useState([])
  const [active ,setActive] = useState([])
  return (
    <>{isAuthenticated ?<div className='bg-[#F5F6FA] w-full flex'>
      
      <Sidebar />
      <div className='flex w-full flex-col '>
        <UserNav />

        <div className='p-[30px]'>
        <div className='flex flex-col gap-7.5'>
        <h1 className=' poppins-semibold text-[32px]'>My Policies</h1>
        <h1 className=' poppins-semibold text-[18px]'>Active Policies</h1>
          <PolicyCard active= {active} setActive={setActive}/>
          <h1 className=' poppins-semibold text-[18px]'>Expired Policies</h1>
          <PolicyCard expired={expired} setExpired={setExpired} />
        </div>
        </div>

      </div>
    </div> : <div>YOU SHOULD BE LOGGED IN TO ACCESS THIS PAGE</div>  }
    
    </>
    
  )
}

export default Policies