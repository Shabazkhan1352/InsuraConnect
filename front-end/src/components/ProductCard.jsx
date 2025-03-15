import React from 'react'
import { TiTick } from "react-icons/ti";
import { IoIosInformationCircleOutline } from "react-icons/io";




const ProductCard = () => {
    return (
        <div className='h-[352px] '>
            <div className=' p-[20px] flex justify-center m-[30px] mt-[20px] ml-[20px] items-center w-[339px] h-full border-[1px] border-[#714FAE] rounded-[12px]'>
                <div className='flex flex-col gap-[20px] w-[278px] h-[307px] '>
                    <h1 className='text-[24px] poppins-bold'>Life Insurance</h1>
                    <div className='w-full flex flex-col gap-[8px]'>
                        
                            <p className='text-[14px] poppins-[regular] flex items-center gap-[7px] '><TiTick className='text-[#17A75C] text-[20px]' />
                            100% hospital bill amount paid</p>
                        

                            <p className='text-[14px] poppins-[regular] flex items-center  gap-[7px]'> <TiTick className='text-[#17A75C] text-[20px]'  />
                            80D tax deduction up to 75,000</p>
                     

                            <p className='text-[14px] poppins-[regular] flex items-center  gap-[7px]'> <TiTick className='text-[#17A75C] text-[20px]' />
                            Standard waiting period</p>
                    




                    </div>

                    <div className='w-full p-[20px] bg-[#EBFBEE] text-[#17A75C] rounded-[8px]'>
                        <p className='text-[12px] poppins-regular flex items-center gap-[10px]'> <IoIosInformationCircleOutline className='text-[20px]  text-[#4f4e4e]' />
                        Simple health evaluation and quick
                        policy approval</p>
                    </div>

                    <div className=' w-full border-[1px] border-[#4f4e4e]'></div>

                    <div className='rounded-[8px] bg-[#714FAE] text-[#FFFFFF]'>
                    <button className='w-[277px] h-[40px] cursor-pointer text-[16px] poppins-bold '>Get Life Insurance Now</button>
                    </div>





                </div>





            </div>

        </div>
    )
}

export default ProductCard
