import React from 'react'
import ProductCard from './components/ProductCard'
import Sidebar from './components/Sidebar'
import UserNav from './components/UserNav'

import { useAuth } from './AuthContext'

const Product = () => {
  const {isAuthenticated} = useAuth()
  return ( 
    <>{isAuthenticated ? <div className='bg-[#F5F6FA] w-full flex'>
      <Sidebar/>
      <div className=' w-full flex flex-col'>
      <UserNav/>
      <div className='p-[30px]'>
     <div className='flex flex-col gap-[30px]'>
     <h1 className=' poppins-semibold text-[32px]'>Products</h1>
     <ProductCard/>
     </div>
      </div>
     
      </div>
  </div> : <div>YOU SHOULD BE LOGGED IN TO ACCESS THIS PAGE</div> }</>
   
  )
}

export default Product
