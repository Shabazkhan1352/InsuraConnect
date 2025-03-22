import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

import icon from '../assets/icon.png'
import { X } from 'lucide-react'


import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";

import { jwtDecode } from 'jwt-decode'


const PolicyCard = ({ expired, active, btncolor }) => {
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [managepolicy, setManagepolicy] = useState(null)
    const [Renewpolicy, setRenewpolicy] = useState(null)
    const [policies, setPolicies] = React.useState([])

    const token = localStorage.getItem("token")
    console.log(token)
    const decoded = jwtDecode(token)

    const userId = decoded.id
    console.log(decoded)
    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user_policies/${userId}`)

                if (expired) setPolicies(response.data.expiredPolicies)
                else if (active) setPolicies(response.data.activePolicies)
                else setPolicies(response.data.allPolicies)
            }
            catch (error) {
                console.log("can't fetch policies", error)
            }
        }
        fetchPolicies()



    }, [])
    console.log(policies)

    const handlepremuim = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "K";
        return num;
    }


    const handleManagePopup = (policy) => {
        setManagepolicy(policy); // Set selected policy
    };

    const closeManagePopup = () => {
        setManagepolicy(null); // Clear selected policy
    };

    const handleRenewPopup = (policy) => {
        setRenewpolicy(policy); // Set selected policy
    };
    const closeRenewPopup = () => {
        setRenewpolicy(null); // Clear selected policy
    };

    const handleStatus = (status) => {
        if (status === "active") {
            return (
                <div className='  flex items-center gap-2'>
                    <FaArrowTrendUp color="#00B69B" size={24} />
                    <span className='nunito-sans capitalize font-semibold text-[#00B69B]   text-[16px]'>{status}</span>

                </div>
            )
        }
        else if (status === "expired") {
            return (
                <div className=' flex items-center gap-2'>
                    <FaArrowTrendDown color="#FF7173" size={24} />
                    <span className='nunito-sans capitalize font-semibold text-[#FF7173]   text-[16px]'>{status}</span>

                </div>
            )
        }
    }
    return (
        <div className='flex  justify-between items-center'>
            {policies.slice(0, 3).map((item, index) => {
                return (
                    <div key={index} className=' w-[355px] h-full bg-white rounded-[14px] p-4'>
                        <div className='flex justify-between items-start'>
                            {/* info */}
                            <div className='flex flex-col   gap-[10px]'>
                                <p className='nunito-sans capitalize font-semibold opacity-70 text-[#202224] text-[16px]'>{item.title}</p>
                                <div className=' flex flex-col gap-[10px]'>
                                    <p className='nunito-sans capitalize font-semibold  text-[#202224] text-[18px]'>Coverage : {item.coverageAmount}/-</p>
                                    <p className='nunito-sans capitalize font-semibold text-[#202224] text-[18px]'>Premium : {handlepremuim(item.premium)}/ <span className='text-[12px] normal-case'>month</span> </p>
                                    <div className='  flex items-center gap-2'>  {handleStatus(item.status)}                     </div>
                                </div>
                            </div>
                            {/* icon */}
                            <div>
                                <img src={icon} alt="" />
                            </div>
                        </div>
                        <button onClick={() => {
                            if (item.status === "active") {
                                handleManagePopup(item)
                            }
                            else if (item.status === "expired") {
                                handleRenewPopup(item)
                            }
                        }}  style={{ backgroundColor: btncolor || "#714FAE" }}  className={` mt-[10px] w-full h-10 rounded-[8px] text-white poppins-semibold text-[16px] cursor-pointer `}>{item.status === "active" ? "Manage Policy" : "Renew Policy"}</button>
                        {/* Managepolicypopup */}
                        {managepolicy && <div key={index} className=" font-[Mypoppins] backdrop-blur-[2px] fixed  inset-0 z-10 flex items-center justify-center bg-black/50">
                            <div className="bg-white max-sm:w-[320px] max-sm:h-[200px] h-[612px] w-[552px] justify-between flex flex-col gap-[30px]  p-7.5 rounded-lg shadow-lg   ">
                                {/* top div */}
                                <div className='flex justify-between items-center pb-7.5 border-b-2 border-b-[#B0B0B0] '>
                                    <div className='flex gap-[20px]'> <h1 className='poppins-semibold text-[36px]'>{managepolicy.title}</h1>
                                        <div ><button ><img src={icon} alt="" /></button></div>
                                    </div>
                                    <button className='cursor-pointer border-[1px] border-black/50 rounded-full p-1' onClick={closeManagePopup}><X size={24} /></button>
                                </div>
                                {/* mid div */}
                                <div className=' flex flex-col justify-between gap-[30px]'>
                                    <div className='flex flex-col gap-[15px]'>
                                        <h2 className='poppins-semibold text-[20px]'>Coverage Amount</h2>
                                        <p className='poppins-regular text-[22px]'>  {managepolicy.coverageAmount} Lakhs in rupees </p>
                                    </div>
                                    <div className='flex flex-col gap-[15px]'>
                                        <h2 className='poppins-semibold text-[20px]'>Premium Amount</h2>
                                        <p className='poppins-regular text-[22px]'> {managepolicy.premium} in Rupees  / month</p>
                                    </div>
                                    <div className='flex flex-col gap-[7px]'>
                                        <h2 className='poppins-regular text-[22px]'>Due Date</h2>
                                        <p className='poppins-semibold text-[20px]'> 19/09/2025</p>
                                        <p className='nunito-sans text-[16px] text-[#FF7173]'>Expires in 15 days</p>
                                    </div>
                                </div>

                                {/* bottom div */}
                                <div className='w-full flex justify-between '>

                                    <button className=' w-[47%] h-[40px] rounded-[8px] bg-[#FF7173] text-white cursor-pointer'>End Policy</button>
                                    <button className=' w-[47%]  h-[40px] rounded-[8px]  bg-[#714FAE] text-white cursor-pointer'>Download PDF</button>

                                </div>                         </div>
                        </div>
                        }
                    </div>


                )
            })}



        </div>

    )
}

export default PolicyCard