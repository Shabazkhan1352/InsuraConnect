import axios from 'axios'
import React, { useState } from 'react'
import { useEffect, useRef } from 'react'

import icon from '../assets/icon.png'
import { WandIcon, X } from 'lucide-react'


import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";

import { jwtDecode } from 'jwt-decode'

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';



const PolicyCard = ({ expired, active, btncolor, btntext, isclaim, setIsclaim }) => {
    const [renewPolicy, setRenewPolicy] = useState(false);
    const [isAnimationDone, setIsAnimationDone] = useState(false);
    const [managepolicy, setManagepolicy] = useState(null)
    const [claimpolicy, setClaimpolicy] = useState(null)
    const [policies, setPolicies] = React.useState([])
    const lottieRef = useRef(null);

    const token = localStorage.getItem("token")

    const decoded = jwtDecode(token)

    const userId = decoded.id
    const email = decoded.email


    const fetchPolicies = async () => {
        try {
            const response = await axios.get(`https://insuraconnect.onrender.com/api/user_policies/${userId}`)



            if (expired) setPolicies(response.data.expiredPolicies)
            else if (active) setPolicies(response.data.activePolicies)
            else setPolicies(response.data.allPolicies)

            console.log(policies)
        }
        catch (error) {
            console.log("can't fetch policies", error)
        }
    }

    useEffect(() => {

        fetchPolicies();
    }, []);



    const handleDownloadPDF = async (policy) => {
        const input = document.getElementById(`policy-${policy._id}`);
        html2canvas(input).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10, 180, 160);
            pdf.save(`${policy.title}-Details.pdf`);
        });
    };



    const handlepremuim = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "K";
        return num;
    }


    const handleManagePopup = (policy) => {
        const expiryDate = new Date(policy.expiryDate);
        const currentDate = new Date();

        // Calculate days left
        const timeDifference = expiryDate - currentDate;
        const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        setManagepolicy({
            ...policy,
            expiryDateFormatted: expiryDate.toLocaleDateString(), // Format expiry date
            daysLeft: daysLeft > 0 ? daysLeft : 0 // Ensure no negative days
        });
    };
    const closeManagePopup = () => {
        setManagepolicy(null);
    }



    const handleClaimPopup = async (policyId) => {
        setClaimpolicy(policyId);

        try {
            const response = await axios.post(
                "https://insuraconnect.onrender.com/api/claims/claim",
                {
                    userEmail: email,
                    policyId
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            console.log(response.data.message)
            setClaimpolicy(null)
        }
        catch (e) {
            console.log("cant send claim request", e);
        }

        // Set selected policy
    };
    const closeClaimPopup = () => {
        setClaimpolicy(null); // Clear selected policy
    };



    //for calim popup
    useEffect(() => {
        if (isAnimationDone) {
            setTimeout(() => {
                closeClaimPopup(); // Close after a short delay for smoother UX
            }, 500);
        }
    }, [isAnimationDone, closeClaimPopup]);

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

    const handleRemovePolicy = async (policyId) => {

        try {
            const token = localStorage.getItem("token");
            const decoded = jwtDecode(token);
            const userId = decoded.id;

            console.log("Removing policy:", policyId);
            const result = await axios.delete('https://insuraconnect.onrender.com/api/user_policies', {
                headers: { "Content-Type": "application/json" },
                data: { userId, policyId }
            });

            console.log(result.data.message);

            // ✅ Update the state immediately
            setPolicies(prevPolicies => prevPolicies.filter(policy => policy._id !== policyId));

            // Close popup after deletion
            setManagepolicy(null);
        } catch (e) {
            console.log("Error deleting policy:", e);
        }





    };
    const processPayment = async (userPolicyId, name, email, userId, policyId, amount, title, isRenewal = true) => {
        try {
            // 1. Request backend to create an order
            const { data } = await axios.post('https://insuraconnect.onrender.com/api/payments/create-order', {
                userId,
                policyId,
                amount
            });

            if (!window.Razorpay) {
                alert("Razorpay SDK failed to load. Check your internet connection.");
                return;
            }

            // 2. Razorpay Payment Options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: data.order.amount,
                currency: "INR",
                name: "InsuraConnect",
                description: `Payment for ${title}`,
                order_id: data.order.id,
                handler: async (response) => {
                    try {
                        // 3. Verify payment after completion
                        const verifyRes = await axios.post("https://insuraconnect.onrender.com/api/payments/verify-payment", {
                            ...response,
                            userId,
                            policyId
                        });

                        if (verifyRes.data.success) {
                            alert(`Payment Successful! Policy ${isRenewal ? "Renewed" : "Activated"}.`);

                            if (isRenewal) {
                                activatePolicy(userPolicyId)
                                setRenewPolicy(true)


                            } else {
                                // Add policy after successful payment
                                await axios.post('https://insuraconnect.onrender.com/api/user_policies', {
                                    userId,
                                    policyId
                                });
                            }
                        } else {
                            alert("Payment Verification Failed. Please Try Again.");
                        }
                    } catch (error) {
                        console.error("Payment Verification Error:", error);
                        alert("Error verifying payment. Please try again.");
                    }
                },
                prefill: {
                    name: name || "User",
                    email: email || "user@example.com",
                    contact: "9999999999",
                },
                theme: { color: "#714FAE" },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Payment Processing Error:", error);
            alert("Something went wrong! Please try again.");
        }
    };

    const handleRenewPolicy = async (userPolicyId, userId, policyId, amount, title) => {
        const answer = confirm("Are you sure you want to renew this Policy?");
        if (!answer) return;

        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);

        const name = decoded.username
        const email = decoded.email
        await processPayment(userPolicyId, name, email, userId, policyId, amount, title);
        if (renewPolicy) {

        }
    };

    const activatePolicy = async (userPolicyId) => {
        try {
            const response = await axios.put(`https://insuraconnect.onrender.com/api/user_policies/${userPolicyId}`)
            console.log(response.data.message)
            fetchPolicies()

        }
        catch (error) {
            console.error("Error renewing policy:", error);
        }

    }



    return (
        <>
        {policies && policies.length > 0 ?(<div className='grid grid-cols-3 gap-[30px] w-full  justify-between items-center'>
            {policies.map((item, index) => {
                return (
                    <div key={index} className=' w-[355px] h-full bg-white rounded-[14px] p-4'>
                        <div className='flex  justify-between items-start'>
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
                        {item.status === "active" ? <button onClick={() => {
                            if (isclaim) {
                                handleClaimPopup(item.policyId)
                            }
                            else {
                                handleManagePopup(item)
                            }
                        }} style={{ backgroundColor: btncolor || "#714FAE" }} className={` mt-[10px] w-full h-10 rounded-[8px] text-white poppins-semibold text-[16px] cursor-pointer `}> {btntext ? btntext : (item.status === "active" ? "Manage Policy" : "Renew Policy")}
                        </button> : <button onClick={() => {
                            handleRenewPolicy(item.userPolicyId, item.userId, item.policyId, item.premium, item.title)
                        }} style={{ backgroundColor: btncolor || "#714FAE" }} className={` mt-[10px] w-full h-10 rounded-[8px] text-white poppins-semibold text-[16px] cursor-pointer `}> {btntext ? btntext : (item.status === "active" ? "Manage Policy" : "Renew Policy")}
                        </button>}

                        {/* Managepolicypopup */}
                        {managepolicy && <div key={index} className=" font-[Mypoppins] backdrop-blur-[2px] fixed  inset-0 z-10 flex items-center justify-center bg-black/20">
                            <div className="bg-white max-sm:w-[320px] max-sm:h-[200px] h-[612px] w-[552px] justify-between flex flex-col gap-[30px]  p-7.5 rounded-lg shadow-lg   ">
                                {/* top div */}
                                <div className='flex justify-between items-center pb-7.5 border-b-2 border-b-[#B0B0B0] '>
                                    <div className='flex gap-[20px]'> <h1 className='poppins-semibold text-[36px]'>{managepolicy.title}</h1>
                                        <div ><button ><img src={icon} alt="" /></button></div>
                                    </div>
                                    <button className='cursor-pointer border-[1px] border-black/50 rounded-full p-1' onClick={closeManagePopup}><X size={24} /></button>
                                </div>
                                {/* mid div */}
                                <div id={`policy-${managepolicy._id}`} className=' flex flex-col justify-between gap-[30px]'>
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
                                        <p className='poppins-semibold text-[20px]'> {managepolicy.expiryDateFormatted}</p>
                                        <p className='nunito-sans text-[16px] text-[#FF7173]'>{managepolicy.daysLeft > 0 ? `Expires in ${managepolicy.daysLeft} days` : "Expired"}</p>
                                    </div>
                                </div>

                                {/* bottom div */}
                                <div className='w-full flex justify-between '>

                                    <button onClick={() => { handleRemovePolicy(managepolicy.policyId) }} className=' w-[47%] h-[40px] rounded-[8px] bg-[#FF7173] text-white cursor-pointer'>End Policy</button>
                                    <button onClick={() => handleDownloadPDF(managepolicy)} className=' w-[47%]  h-[40px] rounded-[8px]  bg-[#714FAE] text-white cursor-pointer'>Download PDF</button>

                                </div>                         </div>
                        </div>
                        }
                        {
                            claimpolicy && <div className="flex-col backdrop-blur-[4px] shadow-xl  font-[Mypoppins] fixed inset-0 z-10 flex items-center justify-center bg-black/20">


                                <div className='bg-white text-black rounded-[9px] h-[40%] w-[40%] flex flex-col items-center justify-center'><DotLottieReact
                                    className="w-[50%]"
                                    src="https://lottie.host/5f124da1-33df-4e35-bca8-082ac81fb0bb/Cn9vf5hYZS.lottie"
                                    
                                    
                                    loop={false}
                                    autoplay
                                    
                                    
                                    />
                                    <div className='poppins-semibold text-[36px]'>Email Sent</div></div>
                            </div>

                        }
                    </div>


                )
            })}



        </div>):<div>No policies found.Please Purchase a policy first</div> }
        
        </>
    )
}

export default PolicyCard