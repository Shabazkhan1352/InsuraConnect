import { useState } from 'react'
import Home from './Home'
import Login from './components/Login'
import Signup from './components/Signup'
import { useNavigate, createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Dashbaord from './Dashbaord'
import Product from './Product'
import Claims from './Claims'
import Policies from './Policies'
import { AuthProvider } from './AuthContext'
import { useAuth } from './AuthContext'
import AdminPanel from './AdminPages/AdminPanel'
import AdminPolicies from './AdminPages/AdminPolicies'
import AdminClaims from './AdminPages/AdminClaims'
function App() {
const {logout, isAuthenticated} = useAuth()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Home /></>
    }, {
      path: '/login',
      element: <Login />
    }, {
      path: '/signup',
      element: <Signup />
    },
    
    {
      path: "/userpanel",
      element: <Dashbaord />
    },
    {
      path: "/product",
      element: <Product />

    },
    {
      path: '/policies',
      element: <Policies />
    },
    {
      path: "/claims",
      element: <Claims />,
    },



    {
      path:"/adminpanel",
      element:<AdminPanel/>
    },
    {
      path : "/adminpolicies",
      element : <AdminPolicies/>
    },
    {
      path : "adminclaims",
      element :<AdminClaims/>
    }


  ])

  return (
    <div >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>

    </div>
  )
}

export default App
