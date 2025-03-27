import React , {useState,useEffect} from 'react'
import { jwtDecode } from 'jwt-decode'
import AdminCard from '../components/admin/AdminCard'

import AdminSidebar from '../components/admin/AdminSidebar'
import UserNav from '../components/UserNav'

import reportIcon from '../assets/report.svg'

import totalUsersIcon from '../assets/Group.svg'
import totalpolicyIcon from '../assets/adminpolicy.svg'
import pendingClaimsIcon from '../assets/pendingclaim.svg'
import totalRenewalIcon from '../assets/adminrenewal.svg'
import axios from 'axios'
import FeaturedInsurance from '../components/admin/FeaturedInsurance '

import { useAuth } from '../AuthContext'


const AdminPanel = () => {
  const {isAuthenticated,role} = useAuth()
 
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPolicies: 0,
    totalRenewals: 0,
    pendingClaims: 0,
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("https://insuraconnect.onrender.com/api/admin/stats");
      
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();


  }, []);

  
console.log(role)
  console.log(stats)
  return (
    <div>
      {isAuthenticated ? <div className='bg-[#F5F6FA] w-full flex   '>

<AdminSidebar />
{/*  */}
<div className='flex w-full flex-col'>
  <div><UserNav   /> </div>


  <div className=' p-[30px]' >
    <div className='flex flex-col gap-7.5'>
      <h1 className=' poppins-semibold text-[32px]'>Dashboard</h1>
      <div className=' flex justify-between'>
      <AdminCard bgColor="#8280FF" icon={totalUsersIcon} title="Total Users" total = {stats.totalUsers}/>
      <AdminCard bgColor="#FEC53D" icon={totalpolicyIcon} title="Total Policies" total = {stats.totalPolicies} />
      <AdminCard bgColor="#FF9066" icon={pendingClaimsIcon} title="Pending Claims" total = {stats.pendingClaims}/>
      <AdminCard bgColor="#FEF2D6" icon={totalRenewalIcon} title="Total Renewals" total = {stats.totalRenewals}/>
      
      
      </div>
      <FeaturedInsurance/>
     
    </div>
  </div>

</div>


</div> : <div>YOU SHOULD BE LOOGES IN AD AN ADMIN TO SEE THIS PAGE</div>}
     
    </div>
  )
}

export default AdminPanel
