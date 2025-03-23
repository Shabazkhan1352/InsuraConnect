import React from 'react'
import AdminCard from '../components/admin/AdminCard'

import AdminSidebar from '../components/admin/AdminSidebar'
import UserNav from '../components/UserNav'
import { FaPlus } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";



const AdminPolicies = () => {
  return (
    <div>
      <div className='bg-white w-full flex   '>

        <AdminSidebar />
        {/*  */}
        <div className='flex w-full flex-col'>
          <div><UserNav /> </div>
          <div className='p-[30px]'>
            <div className=''>
              <h1 className=' poppins-semibold text-[32px]'>Manage Policies</h1>
              <div className='bg-[#F5F6FA]  w-full p-[24px] flex justify-between'>
                <h1 className='nunito-sans font-semibold text-[24px]'>Total Policies</h1>
                <button className="w-[118px] h-[28px] flex items-center justify-center gap-[15px] rounded-[4px] bg-[#714FAE] text-white text-[12px] poppins-regular cursor-pointer">
                  New Policy <FaPlus className="w-[12px] h-[12px]" />
                </button>

              </div>
              <table className="w-full rounded-[12px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="nunito-sans font-bold text-[14px] text-left p-3">Product Name</th>
                    <th className="nunito-sans font-bold text-[14px] text-left p-3">Date Created</th>
                    <th className="nunito-sans font-bold text-[14px] text-left p-3">Amount</th>
                    <th className="nunito-sans font-bold text-[14px] text-left p-3">Status</th>
                    <th className="nunito-sans font-bold text-[14px] text-left p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr >
                    <td className="p-3 flex items-center gap-2">
                      <div className="w-[36px] h-[36px] flex justify-center items-center rounded-full bg-[#bfbfee]">

                      </div>
                      <h1 className='nunito-sans font-semibold text-[14px]'>Car Insurance</h1>
                    </td>
                    <td className="p-3 nunito-sans font-semibold text-[14px]">12.09.2019 - 12:53 PM</td>
                    <td className="p-3 nunito-sans font-semibold text-[14px]">$344,295</td>
                    <td className="p-3">
                      <button className="bg-[#00B69B] text-white rounded-[13px] w-[93px] h-[27px] nunito-sans font-semibold text-[14px]">
                        Active
                      </button>
                    </td>
                    <td className="p-3">
                      <button className="flex gap-[10px]">
                        <MdOutlineModeEdit className="w-[25px] h-[25px]" />
                        <RiDeleteBinLine className="w-[25px] h-[25px]" />
                      </button>
                    </td>
                  </tr>
                  <tr >
                    <td className="p-3 flex items-center gap-2">
                      <div className="w-[36px] h-[36px] flex justify-center items-center rounded-full bg-[#bfbfee]">

                      </div>
                      <h1 className='nunito-sans font-bold text-[14px]'>Life Insurance</h1>
                    </td>
                    <td className="p-3 nunito-sans font-semibold text-[14px]">12.09.2019 - 12:53 PM</td>
                    <td className="p-3 nunito-sans font-semibold text-[14px]">$174,295</td>
                    <td className="p-3">
                      <button className="bg-[#00B69B] text-white rounded-[13px] w-[93px] h-[27px] nunito-sans font-semibold text-[14px]">
                        Active
                      </button>
                    </td>
                    <td className="p-3">
                      <button className="flex gap-[10px]">
                        <MdOutlineModeEdit className="w-[25px] h-[25px]" />
                        <RiDeleteBinLine className="w-[25px] h-[25px]" />
                      </button>
                    </td>
                  </tr>

                  <tr >
                    <td className="p-3 flex items-center gap-2">
                      <div className="w-[36px] h-[36px] flex justify-center items-center rounded-full bg-[#bfbfee]">

                      </div>
                      <h1 className='nunito-sans font-bold text-[14px]'>Health Insurance</h1>
                    </td>
                    <td className="p-3 nunito-sans font-semibold text-[14px]">12.09.2019 - 12:53 PM</td>
                    <td className="p-3 nunito-sans font-semibold text-[14px]">$234,295</td>
                    <td className="p-3">
                      <button className="bg-[#FD5454] text-white rounded-[13px] w-[93px] h-[27px] nunito-sans font-semibold text-[14px]">
                        Closed
                      </button>
                    </td>
                    <td className="p-3">
                      <button className="flex gap-[10px]">
                        <MdOutlineModeEdit className="w-[25px] h-[25px]" />
                        <RiDeleteBinLine className="w-[25px] h-[25px]" />
                      </button>
                    </td>
                  </tr>




                </tbody>
              </table>



            </div>




          </div>

        </div>


      </div>
    </div>
  )
}

export default AdminPolicies


