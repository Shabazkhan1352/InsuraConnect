import React from 'react'
import AdminCard from '../components/admin/AdminCard'

import AdminSidebar from '../components/admin/AdminSidebar'
import UserNav from '../components/UserNav'

const AdminClaims = () => {
    return (
        <div>
          <div className='bg-[#F5F6FA] w-full flex   '>
    
            <AdminSidebar />
            {/*  */}
            <div className='flex w-full flex-col'>
              <div><UserNav /> </div>
    
            </div>
    
    
          </div>
        </div>
      )
}

export default AdminClaims