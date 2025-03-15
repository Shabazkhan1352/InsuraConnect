import { useState } from 'react'
import Home from './Home'
import Login from './components/Login'
import Signup from './components/Signup'
import { useNavigate,createBrowserRouter,RouterProvider } from 'react-router-dom'
import './App.css'
import Dashbaord from './Dashbaord'
import Product from './Product'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<><Home/></>
    },{
      path:'/login',
      element:<Login/>
    },{
      path:'/signup',
      element:<Signup/>
    },
    {
      path:"/userpanel",
      element:<Dashbaord/>
    },
    {
      path:"/product",
      element:<Product/>
    }
  ])

  return (
    <div >
<RouterProvider router={router}/>
      
    </div>
  )
}

export default App
