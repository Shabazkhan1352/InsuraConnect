import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import UserNav from "../components/UserNav";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdDone } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaUmbrella } from "react-icons/fa";



import { FaRupeeSign } from "react-icons/fa";

import { X } from "lucide-react";

import { useAuth } from "../AuthContext";
import axios from "axios";


const AdminClaims = () => {
  const { isAuthenticated } = useAuth();
  const [claims, setClaims] = useState([]);
  const [approve, setapprove] = useState(false)
  const [addPolicyPopUp, setaddPolicyPopUp] = useState(false)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [premium, setPremium] = useState(0)
  const [coverageAmount, setcoverageAmount] = useState(0)


  const token = localStorage.getItem("token");
  console.log(token)

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get("https://insuraconnect.onrender.com/api/claims/");
        setClaims(response.data);
      } catch (error) {
        console.log("Can't fetch policies", error);
      }
    };
    fetchClaims();
  }, []);


  const handleDeleteclaim = async (ClaimId) => {
    const answer = confirm("Are You Sure You Want to Delete this Claim ?")
    if (answer) {
      try {
        const response = await axios.delete(`https://insuraconnect.onrender.com/api/claims/${ClaimId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
            },
          }
        )
        setClaims((prevClaims) => prevClaims.filter(claim => claim._id !== ClaimId));
        console.log(response.data.message)
      }
      catch (e) {
        console.log("error deleting the policy", e)
      }


    }


  }
  const handleApproveclaim = async (ClaimId) => {
    const answer = confirm("Are You Sure You Want to Approve this Claim ?")
    if (answer) {
      try {
        const response = await axios.patch(
          `https://insuraconnect.onrender.com/api/claims/${ClaimId}/approve`,
          {}, // Empty object for body
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data.message);
        setClaims((prevClaims) => prevClaims.filter(claim => claim._id !== ClaimId));

      } catch (e) {
        console.error("Error approving the claim", e.response?.data || e.message);
      }


    }


  }


  const handleStatus = (claim) => {
    if (claim.status === "Approved") {
      return <button className="cursor-pointer">
        <IoCheckmarkDoneCircle   className="w-[20px] h-[20px] mr-[10px] text-[#714FAE]" />
      </button>
    }
    else {
      return <button className="cursor-pointer">
      <MdDone onClick={() => { handleApproveclaim(claim._id) }} className="w-[20px] h-[20px] mr-[10px] text-blue-600" />
    </button>

    }
  }


  return (
    <div>
      {isAuthenticated ? (
        <div className="bg-[#F5F6FA] w-full flex">
          <AdminSidebar />
          {/* Right Section */}
          <div className="flex w-full flex-col">
            <UserNav />
            <div className="p-[30px]">
              <div className="flex flex-col gap-7.5">
                <h1 className="poppins-semibold text-[32px]">Manage Claims</h1>

                {/* Table Container */}
                <div className="bg-white rounded-[14px] p-[24px] flex flex-col gap-8">
                  <div className="flex justify-between items-center">
                    <h1 className="nunito-sans font-bold text-[24px]">
                      Claim Requests ({claims.length})
                    </h1>

                  </div>

                  {/* Table */}
                  <table className="w-full">
                    <thead className=" ">
                      <tr className="bg-[#F5F6FA]  ">
                        <th className="p-3 px-5 text-left text-[14px] font-bold rounded-l-[12px]">Insurance</th>
                        <th className="p-3 text-left text-[14px] font-bold">Date Recieved</th>
                        <th className="p-3 text-left text-[14px] font-bold">UserEmails</th>
                        <th className="p-3 text-left text-[14px] font-bold">Status</th>
                        <th className="p-3 text-left text-[14px] font-bold rounded-r-[12px]">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {claims.length > 0 ? (
                        claims.map((item, index) => (
                          <tr key={index} className="" >
                            <td className="p-3 flex items-center gap-2">
                              <div className="w-[36px] h-[36px] flex justify-center items-center text-[#714FAE] rounded-full bg-[#bfbfee]"><FaUmbrella className="text-[20px]" /></div>
                              <h1 className="nunito-sans font-semibold text-[14px]">
                                {item.policyName}
                              </h1>
                            </td>
                            <td className="p-3 nunito-sans font-semibold text-[14px]">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-3 nunito-sans font-semibold text-[14px]  ">
                              {item.userEmail}
                            </td>
                            <td className="p-3">
                              <button className="bg-[#00B69B] text-white rounded-[13px] w-[93px] h-[27px] nunito-sans font-semibold text-[14px]">
                                {item.status}
                              </button>
                            </td>
                            <td className="p-3 ">
                             {handleStatus(item)}
                              <button onClick={() => handleDeleteclaim(item._id)} className="cursor-pointer">
                                <RiDeleteBinLine className="w-[20px] h-[20px] text-red-600" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="p-4 text-center text-gray-500">
                            No Claims found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {addPolicyPopUp && <div className=" font-[Mypoppins] backdrop-blur-[2px] fixed  inset-0 z-10 flex items-center justify-center bg-black/50">
            <div className="bg-white max-sm:w-[320px] max-sm:h-[200px] h-[612px] w-[552px] justify-between flex flex-col gap-[20px]  p-6 rounded-lg shadow-lg   ">
              {/* top div */}
              <div className='flex justify-between items-center pb-5 border-b-1 border-b-[#B0B0B0] '>
                <h1 className="poppins-semibold text-[36px]">Add New Policy</h1>
                <button className='cursor-pointer border-[1px] border-black/50 rounded-full p-1' onClick={closehandlepopup}><X size={24} /></button>
              </div>
              {/* mid div */}
              <div className=' w-full flex flex-col justify-between gap-[30px]'>
                <form onSubmit={handleAddPolicy} action="" className="w-full flex flex-col gap-5">
                  <div className="w-full flex flex-col gap-[13px]" >
                    <h2 className="poppins-semibold text-[20px]">Policy Name</h2>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} name="" placeholder="Type here." className="text-[#000000] px-5 py-2.5 border-1 poppins-regular text-[16px] border-[#000000]/20 rounded-[8px] outline-none w-full" id="" />
                  </div>
                  <div className="w-full flex flex-col gap-[13px]" >
                    <h2 className="poppins-semibold text-[20px]">Policy Description</h2>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} name="" placeholder="Type here." className="text-[#000000] px-5 py-2.5 border-1 poppins-regular text-[16px] border-[#000000]/20 rounded-[8px] outline-none w-full" id="" />
                  </div>
                  <div className="w-full flex flex-col gap-[13px]" >
                    <h2 className="poppins-semibold text-[20px]">Policy Premium</h2>
                    <input type="number" value={premium} onChange={(e) => setPremium(e.target.value)} name="" placeholder="Type here." className="text-[#000000] px-5 py-2.5 border-1 poppins-regular text-[16px] border-[#000000]/20 rounded-[8px] outline-none w-full" id="" />
                  </div>
                  <div className="w-full flex flex-col gap-[13px]" >
                    <h2 className="poppins-semibold text-[20px]">Policy Coverage Amount</h2>
                    <input type="number" value={coverageAmount} onChange={(e) => setcoverageAmount(e.target.value)} name="" placeholder="Type here." className="text-[#000000] px-5 py-2.5 border-1 poppins-regular text-[16px] border-[#000000]/20 rounded-[8px] outline-none w-full" id="" />
                  </div>


                  <div className='w-full '>


                    <button className='poppins-semibold text-[16px] w-full  h-[40px] rounded-[8px]  bg-[#714FAE] text-white cursor-pointer'>Add New Policy</button>

                  </div>

                </form>

              </div>


            </div>
          </div>
          }
        </div>
      ) : (
        <div className="text-center text-red-500 font-semibold text-lg">
          YOU SHOULD BE LOGGED IN AS AN ADMIN TO SEE THIS PAGE
        </div>
      )}
    </div>
  );
}

export default AdminClaims