import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import UserNav from "../components/UserNav";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { FaUmbrella } from "react-icons/fa";


import { X } from "lucide-react";

import { useAuth } from "../AuthContext";
import axios from "axios";

const AdminPolicies = () => {
  const { isAuthenticated } = useAuth();
  const [policies, setPolicies] = useState([]);
  const [addPolicyPopUp, setaddPolicyPopUp] = useState(false)
  const [addmorepolicypopup, setAddmorepolicypopup] = useState(false)


  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [premium, setPremium] = useState(0)
  const [coverageAmount, setcoverageAmount] = useState(0)
  const [benefits, setBenefits] = useState(["", "", ""]);



  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get("https://insuraconnect.onrender.com/api/policies");
        setPolicies(response.data);
      } catch (error) {
        console.log("Can't fetch policies", error);
      }
    };
    fetchPolicies();
  }, []);

  const handleAddPolicy = async () => {
    try {
      // Get token

      const result = await axios.post(
        "https://insuraconnect.onrender.com/api/policies/",
        {
          title,
          description,
          premium,
          coverageAmount,
          benefits
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );

      console.log(result.data.message);
      setPolicies([...policies, result.data]); // Update UI with new policy
      setaddPolicyPopUp(false); // Close popup after adding policy
    } catch (e) {
      console.log("Error adding policy:", e.response ? e.response.data : e.message);
    }
  };

  const handleDeletePolicy = async (policyId) => {
    const answer = confirm("Are You Sure You Want to Delete this Policy ?")
    if (answer) {
      try {
        const response = await axios.delete(`https://insuraconnect.onrender.com/api/policies/${policyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
            },
          }
        )
        setPolicies((prevPolicies) => prevPolicies.filter(policy => policy._id !== policyId));
        console.log(response.data.message)
      }
      catch (e) {
        console.log("error deleting the policy", e)
      }


    }


  }


  const handlepopup = () => {
    setaddPolicyPopUp(true)

  }
  const closehandlepopup = () => {
    setaddPolicyPopUp(false)
  }
  const openaddmorepopup = () => {
    setAddmorepolicypopup(true)
  }
  const closeaddmorepopup = () => {
    setAddmorepolicypopup(false)
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
                <h1 className="poppins-semibold text-[32px]">Manage Policies</h1>

                {/* Table Container */}
                <div className="bg-white rounded-[14px] p-[24px] flex flex-col gap-8">
                  <div className="flex justify-between items-center">
                    <h1 className="nunito-sans font-bold text-[24px]">
                      Total Policies ({policies.length})
                    </h1>
                    <button
                      onClick={() => handlepopup()} // Update this with the actual logic
                      className="w-[118px] h-[28px] flex items-center justify-center gap-[15px] rounded-[4px] bg-[#714FAE] text-white text-[12px] poppins-medium cursor-pointer"
                    >
                      New Policy <FaPlus className="w-[12px] h-[12px]" />
                    </button>
                  </div>

                  {/* Table */}
                  <table className="w-full">
                    <thead className=" ">
                      <tr className="bg-[#F5F6FA]  ">
                        <th className="p-3 px-5 text-left text-[14px] font-bold rounded-l-[12px]">Product Name</th>
                        <th className="p-3 text-left text-[14px] font-bold">Date Created</th>
                        <th className="p-3 text-left text-[14px] font-bold">Amount</th>
                        <th className="p-3 text-left text-[14px] font-bold">Status</th>
                        <th className="p-3 text-left text-[14px] font-bold rounded-r-[12px]">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {policies.length > 0 ? (
                        policies.map((item, index) => (
                          <tr key={index} className="">
                            <td className="p-3 flex items-center gap-2">
                              <div className="w-[36px] h-[36px] flex justify-center items-center text-[#714FAE] rounded-full bg-[#bfbfee]"><FaUmbrella className="text-[20px]" /></div>

                              <h1 className="nunito-sans font-semibold text-[14px]">
                                {item.title}
                              </h1>
                            </td>
                            <td className="p-3 nunito-sans font-semibold text-[14px]">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-3 nunito-sans font-semibold text-[14px] flex items-center">
                              <FaRupeeSign />{item.coverageAmount}
                            </td>
                            <td className="p-3">
                              <button className="bg-[#00B69B] text-white rounded-[13px] w-[93px] h-[27px] nunito-sans font-semibold text-[14px]">
                                Active
                              </button>
                            </td>
                            <td className="p-3 flex gap-4">
                              <button className="cursor-pointer">
                                <MdOutlineModeEdit className="w-[20px] h-[20px] text-blue-600" />
                              </button>
                              <button onClick={() => handleDeletePolicy(item._id)} className="cursor-pointer">
                                <RiDeleteBinLine className="w-[20px] h-[20px] text-red-600" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="p-4 text-center text-gray-500">
                            No policies found.
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
          {
            addmorepolicypopup && <div className=" font-[Mypoppins] backdrop-blur-[2px] fixed  inset-0 z-10 flex items-center justify-center bg-black/50">
              <div className="bg-white max-sm:w-[320px] max-sm:h-[200px] h-fit w-[552px] justify-between flex flex-col gap-[20px]  p-6 rounded-lg shadow-lg   ">
                {/* top div */}
                <div className='flex justify-between items-center pb-5 border-b-1 border-b-[#B0B0B0] '>
                  <h1 className="poppins-semibold text-[36px]">Add More details</h1>
                  <button className='cursor-pointer border-[1px] border-black/50 rounded-full p-1' onClick={closeaddmorepopup}><X size={24} /></button>


                </div>
                {/* mid div */}
                <div className=' w-full flex flex-col justify-between gap-[30px]'>
                  <form onSubmit={closeaddmorepopup} action="" className="w-full flex flex-col gap-5">
                    <div className="w-full flex flex-col gap-[13px]" >
                      <h2 className="poppins-semibold text-[20px]">Policy Benefits</h2>
                      {benefits.map((value, index) => (
                        <input
                          key={index}
                          type="text"
                          value={value}
                          onChange={(e) =>
                            setBenefits((prev) => {
                              const newBenefits = [...prev];
                              newBenefits[index] = e.target.value;
                              return newBenefits;
                            })
                          }
                          placeholder="Type here."
                          className="text-[#000000] px-5 py-2.5 border-1 poppins-regular text-[16px] border-[#000000]/20 rounded-[8px] outline-none w-full"
                        />
                      ))}  </div>
                   


                    <div className='w-full '>


                      <button className='poppins-semibold text-[16px] w-full  h-[40px] rounded-[8px]  bg-[#714FAE] text-white cursor-pointer'>Add Info</button>

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
};

export default AdminPolicies;
