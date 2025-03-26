import axios from "axios";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaCar, FaHome, FaHeartbeat } from "react-icons/fa";
import { RiEBikeFill } from "react-icons/ri";
import { MdOutlineDevices, MdOutlineHealthAndSafety } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const FeaturedInsurance = () => {
  const [topPolicies, setTopPolicies] = useState([]);

  useEffect(() => {
    const fetchTopPolicies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/toppolicies");
        setTopPolicies(response.data);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchTopPolicies();
  }, []);

  const handleImage = (policy) => {
    switch (policy.title) {
      case "Car Insurance":
        return <FaCar className="w-[130px] h-[130px] text-[#714FAE]" />;
      case "Electronics Insurance":
        return <MdOutlineDevices className="w-[130px] h-[130px] text-[#714FAE]" />;
      case "Home Insurance":
        return <FaHome className="w-[130px] h-[130px] text-[#714FAE]" />;
      case "Life Insurance":
        return <FaHeartbeat className="w-[130px] h-[130px] text-[#714FAE]" />;
      case "Bike Insurance":
        return <RiEBikeFill className="w-[130px] h-[130px] text-[#714FAE]" />;
      case "Health Insurance":
        return <MdOutlineHealthAndSafety className="w-[130px] h-[130px] text-[#714FAE]" />;
      default:
        return null;
    }
  };

  // Custom Arrows
  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute top-[50%] z-10  left-[-40px]  transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full text-[#714FAE] hover:bg-gray-200 cursor-pointer"
    >
      <IoIosArrowBack className="text-3xl" />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full text-[#714FAE] hover:bg-gray-200 cursor-pointer"
    >
      <IoIosArrowForward className="text-3xl" />
    </button>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className=" relative bg-white max-w-[360px] rounded-[14px]  p-6 ">
      <h1 className="text-[22px] leading-[20px] poppins-medium  mb-6">Featured Insurance</h1>
      <div className="relative ">
        <Slider {...settings}>
          {topPolicies.map((item, index) => (
            <div key={index} className="bg-white  rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">{handleImage(item)}</div>
              <h2 className=" poppins-medium text-[20px]">{item.title}</h2>
            
              <p className="mt-2 poppins-medium text-[24px] text-[#714FAE]/70">{item.totalRevenue}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FeaturedInsurance;
