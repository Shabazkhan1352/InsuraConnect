import React from 'react'
import { useState, useEffect } from 'react';
import { TiTick } from "react-icons/ti";
import { IoIosInformationCircleOutline } from "react-icons/io";
import axios from 'axios';

import { jwtDecode } from 'jwt-decode'







const ProductCard = () => {
    const [products, setProducts] = useState([])

    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/policies')
                setProducts(response.data)
            }
            catch (error) {
                console.log("can't fetch policies", error)
            }
        }
        fetchProducts()



    }, [])
    console.log(products)
    const processPayment = async (name,email,userId, policyId, amount, title, isRenewal = false) => {
        try {
            // 1. Request backend to create an order
            const { data } = await axios.post('http://localhost:5000/api/payments/create-order', {
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
                        const verifyRes = await axios.post("http://localhost:5000/api/payments/verify-payment", {
                            ...response,
                            userId,
                            policyId
                        });
    
                        if (verifyRes.data.success) {
                            alert(`Payment Successful! Policy ${isRenewal ? "Renewed" : "Activated"}.`);
    
                            if (isRenewal) {
                                fetchPolicies(); // Refresh user policies after renewal
                            } else {
                                // Add policy after successful payment
                                await axios.post('http://localhost:5000/api/user_policies', {
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

    const handleAddPolicy = async (policyId, amount, title) => {
        const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userId = decoded.id;
    const name = decoded.name
const email = decoded.email
    await processPayment(name,email ,userId, policyId, amount, title, false);
    };
    
    

    return (
        <div className=' flex justify-between flex-wrap gap-[50px]'>
            {products.map((item, index) => {
                return (
                    <div key={index} className='h-full '>
                        <div className=' p-[20px] flex justify-center   items-center w-[339px] h-full border-[1px] bg-white border-[#714FAE] rounded-[12px]'>
                            <div className='flex flex-col gap-[20px] w-[278px] h-[307px] '>
                                <h1 className='text-[24px] poppins-bold'>{item.title}</h1>

                                <div className='w-full flex flex-col gap-[8px]'>



                                    {item.benefits?.map((list, i) => {
                                        return (

                                            <p key={i} className='text-[14px] poppins-[regular] flex items-center  gap-[7px]'> <TiTick className='text-[#17A75C] text-[20px]' />
                                                <span className=' line-clamp-1 text-ellipsis'>{list}</span></p>

                                        )
                                    })}



                                </div>

                                <div className='w-full p-[20px] bg-[#EBFBEE] text-[#17A75C] rounded-[8px]'>
                                    <p className='text-[12px] poppins-regular flex items-center gap-[10px] '> <IoIosInformationCircleOutline className='text-[20px]  text-[#4f4e4e]' />
                                        <span className='line-clamp-2 text-ellipsis'>{item.description}</span></p>
                                </div>

                                <div className=' w-full border-[1px] border-[#4f4e4e]'></div>

                                <div className='rounded-[8px] bg-[#714FAE] text-[#FFFFFF]'>
                                    <button onClick={() => handleAddPolicy(item._id, item.premium, item.title)} className='w-[277px] h-[40px] cursor-pointer text-[16px] poppins-bold '>Get {item.title} Now</button>
                                </div>





                            </div>





                        </div>

                    </div>
                )
            })}
        </div>

    )
}

export default ProductCard
