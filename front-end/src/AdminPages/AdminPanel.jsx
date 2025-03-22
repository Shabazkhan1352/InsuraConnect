import React from 'react'
import AdminCard from '../components/admin/AdminCard'

import AdminSidebar from '../components/admin/AdminSidebar'
import UserNav from '../components/UserNav'

import reportIcon from '../assets/report.svg'


const AdminPanel = () => {
  return (
    <div>
      <div className='bg-[#F5F6FA] w-full flex   '>

        <AdminSidebar />
        {/*  */}
        <div className='flex w-full flex-col'>
          <div><UserNav /> </div>


          <div className=' p-[30px]' >
            <div className='flex flex-col gap-7.5'>
              <h1 className=' poppins-semibold text-[32px]'>Dashboard</h1>
              <div className=' flex justify-between'><AdminCard/>
              <AdminCard/>
              <AdminCard/>
              <AdminCard/>
              
              
              </div>
             
            </div>
          </div>

        </div>


      </div>
    </div>
  )
}

export default AdminPanel
