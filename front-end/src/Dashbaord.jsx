import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import UserNav from './components/UserNav'

const Dashbaord = () => {
  return (
    <div className=' flex'>
    <Sidebar/>
    <UserNav/>

    </div>
  )
}

export default Dashbaord