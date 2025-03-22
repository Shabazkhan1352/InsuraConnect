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

    const handleAddPolicy = async (policyId) => {
        const token = localStorage.getItem("token")
        const decoded = jwtDecode(token)

        const userId = decoded.id
        try {
            const result = await axios.post('http://localhost:5000/api/user_policies', {
                userId,
                policyId

            })
            console.log(result.data.message)
        }
        catch(e){
            console.log(e)
        }

    }

    return (
        <div className=' flex justify-between flex-wrap gap-[50px]'>
            {products.map((item, index) => {
                return (
                    <div key={index} className='h-full '>
                        <div className=' p-[20px] flex justify-center   items-center w-[339px] h-full border-[1px] bg-white border-[#714FAE] rounded-[12px]'>
                            <div className='flex flex-col gap-[20px] w-[278px] h-[307px] '>
                                <h1 className='text-[24px] poppins-bold'>{item.title}</h1>

                                <div className='w-full flex flex-col gap-[8px]'>



                                    {item.benefits.map((list, i) => {
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
                                    <button onClick={()=>handleAddPolicy(item._id)} className='w-[277px] h-[40px] cursor-pointer text-[16px] poppins-bold '>Get {item.title} Now</button>
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
