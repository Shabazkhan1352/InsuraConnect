import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from './components/Navbar'
import family from '../src/assets/family.png'
import Card from './components/InsuraCard'


import car from './assets/car.svg'
import electronics from './assets/electronics.svg'
import health from './assets/health.svg'
import life from './assets/life.svg'
import home from './assets/Home.svg'
import bike from './assets/bike.svg'
import user from './assets/user.png'
import Feedback from './components/Feedback'


import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TiLocation } from "react-icons/ti";
import { FaPhoneAlt } from "react-icons/fa";


import bg from './assets/bg.png'
import logo2 from './assets/logowhite.svg'

import map from './assets/map.png'

import {motion} from 'framer-motion'
import {fadeIn} from './variants'



const Home = () => {

  const cards = [
    {
      title: "Card Insurance",
      desc: "Drive worry-free with our car insurance plans. Get coverage for accidents, theft, and damages, ensuring a smooth and secure ride every time.",
      image: car
    },
    {
      title: "Bike Insurance",
      desc: "Stay safe on the road with our bike insurance. Protect yourself against accidents, theft, and repairs while enjoying a hassle-free ride.",
      image: bike
    },
    {
      title: "Home Insurance",
      desc: "Safeguard your home and belongings with our home insurance plans. Get protection against natural disasters, theft, and unexpected damages.",
      image: home
    },
    {
      title: "Life Insurance",
      desc: "Secure your family’s future with our life insurance policies. Enjoy financial protection and peace of mind knowing your loved ones are taken care of.",
      image: life
    },
    {
      title: "Electronic Insurance",
      desc: "Keep your gadgets protected with our electronics insurance. Get coverage for accidental damage, breakdowns, and theft, ensuring your devices stay safe.",
      image: electronics
    },
    {
      title: "Health Insurance",
      desc: "Your health is our priority. Our health insurance plans cover medical expenses, hospital stays, and emergencies, giving you peace of mind.",
      image: health
    },
  ]

  const feedback = [
    {
      stars: 5,
      desc: "InsuraConnect made buying insurance so easy! The process was seamless, and I got the best policy within minutes. Highly recommended for hassle-free insurance solutions!",
      profilepic: user,
      username: "Shabaz khan",
      role: "advisor"

    },
    {
      stars: 3,
      desc: "I recently filed a claim through InsuraConnect, and I was surprised by how smooth and quick the process was. Excellent customer support and a user-friendly platform!",
      profilepic: user,
      username: "faseeh hannan",
      role: "advisor"

    },
    {
      stars: 2,
      desc: "A one-stop solution for all my insurance needs! Comparing policies and managing renewals has never been this simple. InsuraConnect is truly a game-changer!",
      profilepic: user,
      username: "Md zaid",
      role: "advisor"

    }
  ]
  return (
    <div className=' bg-[#ECECEC] h-full'>
      <div className='bg-[url("./assets/bg.png")] bg-no-repeat bg-cover h-screen rounded-b-[80px] shadow-2xl overflow-hidden'>
        <div className=''><Navbar /></div>
        {/* hero section */}
        <div className=' mx-auto  flex justify-between   w-[80%] mt-[80px] '>
          {/* left div */}
          <motion.div 
            variants={fadeIn("right",0.5)}
            initial = 'hidden'
            whileInView={"show"}
            
            viewport={{once : true , amount: 0.7}}
          
          className='flex flex-col gap-[40px]'>
            <h1 className=' marcellus font-normal text-[76px] tracking-[3px] text-white leading-[110%] whitespace-nowrap'>Trusted Insurance,<br />
             Secured Peace of <br /> Mind</h1>
            <p className=' text-white '>InsuraConnect offers reliable coverage, ensuring security and peace of mind for you and your loved ones.</p>
            <div className=' flex gap-[20px]'>
              <button className=' w-[217px] h-[60px] bg-white rounded-[8px] text-[#313131] inter-semibold text-[18px] tracking-[0.25px] cursor-pointer'>Get Started</button>
              <button className='w-[217px] h-[60px] border-[1px] rounded-[8px] text-white inter-semibold text-[18px] tracking-[0.25px] border-white cursor-pointer'>Explore Policies</button>
            </div>
          </motion.div>
          {/* right div */}
          <div className=' flex flex-col items-end  gap-0 overflow-hidden '>
            <motion.div
            variants={fadeIn("up",0.5)}
            initial = 'hidden'
            whileInView={"show"}
            
            viewport={{once : true , amount: 0.7}}
            className=' absoulte    '>
              <img className=' w-[850px] h-[665px] ' sizes='' src={family} alt="" />
            </motion.div>
           
          </div>
        </div>
      </div>

      {/* our serverces */}

      <motion.div 
      variants={fadeIn("up",0.5)}
      initial = 'hidden'
      whileInView={"show"}
      
      viewport={{once : true , amount: 0.7}}
       className='mx-auto flex-col items-center justify-center w-[80%] my-[100px]'>
        <h4 className='poppins-medium text-[20px] font-extrabold text-[#313131] text-center   '>Our Services</h4>
        <h1 className='text-[80px] marcellus text-[#313131] flex flex-col items-center leading-[110%] justify-center mt-[10px]'><span>Better Digital Insurance </span><span>Begins Right Here</span>
        </h1>
      </motion.div>

      {/* cards */}
      <div className=' flex flex-wrap  justify-between gap-[20px] w-[80%] mx-auto'>
        {cards.map((item, index) => {
          return (
            <div key={index} className=' shadow-2xl' >
              <Card title={item.title} desc={item.desc} image={item.image} />
            </div>
          )
        })}

      </div>


      {/* feedback */}
      <div className=' bg-white w-full   my-[100px] h-[475px]  shadow-2xl'>
        <h4 className='poppins-medium text-[20px] font-extrabold text-[#313131] text-center w-[80%] mx-auto py-10 '>Customer Feedback</h4>
        <div className='w-[80%] mx-auto'>

          <div className=' flex justify-between items-center gap-3'>
            {feedback.map((item, index) => {
              return (<div key={index} className=' shadow-2xl' >
                <Feedback  stars={item.stars} desc={item.desc} profilepic={item.profilepic} username={item.username} role={item.role} />
              </div>
              )
            })}
          </div>
        </div>



      </div>
      {/* connect */}
      <div className='mx-auto flex-col items-center justify-center w-[80%] my-[100px]'>
        <h4 className='poppins-medium text-[20px] font-extrabold text-[#313131] text-center   '>Connect with us</h4>
        <h1 className='text-[80px] marcellus text-[#313131] flex flex-col items-center leading-[110%] justify-center mt-[10px]'><span>Connect for Better</span><span>Insurance Support</span>
        </h1>
      </div>


      {/* conect form */}
      <div className='w-[80%] h-[595px] bg-white rounded-[22px] mx-auto flex my-[100px] '>
        <div className='w-[545px] mx-auto py-12 flex flex-col justify-between'>
          <div className=' flex flex-col gap-5'>
            <h1 className='text-[64px] marcellus text-[#313131]'>Get in <span className=' text-[#714FAE]'>Touch</span></h1>
            <p className="text-[14px] poppins-regular text-justify ">
              Have questions about your policy or need assistance with claims? Fill out the form, and our support team will get back to you as soon as possible.
            </p></div>

            <div className='text-[#313131]/40 text-center'> ____________________ </div>
          <form action="" className=' flex flex-col gap-5 w-full'>

         <input type="text" name="" id="" placeholder='Name' className=' border-[1px] border-[#313131]/40 px-[20px] py-[13px] rounded-[8px]'  />
         <input type="email" name="" id="" placeholder='Email' className=' border-[1px] border-[#313131]/40 px-[20px] py-[13px] rounded-[8px]'/>
         <input type="text" name="" id="" placeholder='Phone number' className=' border-[1px] border-[#313131]/40 px-[20px] py-[13px] rounded-[8px]'/>
         <input type="submit" name="" id="" value="Send" className=' text-white bg-[#714FAE] cursor-pointer hover:bg-[#714FAE]/90 px-[20px] py-[13px] rounded-[8px] poppins-semibold text-[16px]'/>
      
          </form>

        </div>

        <div className='overflow-hidden bg-cover shadow-2xl  '>
          <img className='w-[488px] h-[595px] object-cover' src={map} alt="" />
        </div>
      </div>
{/* footer */}
      <div className=' bg-[url("./assets/footer.png")] w-full h-[480px] '>

        <div className=' w-[80%] h-full mx-auto py-[100px] text-white flex gap-[100px] justify-between items-start'>
          <div className='flex flex-col h-full justify-between text-white'>
            <img className=' w-[183px] h-[45px]' src={logo2} alt="" />
            <div className=' flex  flex-col items-start justify-start gap-[21px]'>
            <p className=' poppins-regular text-[14px] flex  items-center gap-[17px] '><TiLocation className=' w-[40px] h-[40px]' /> <span>Hosur Main Road, opposite Lalbagh Main Gate, Sudhama Nagar, Bengaluru, Karnataka 560027</span></p>
            <p className=' poppins-regular text-[14px] flex  items-center gap-[17px]   '>
            <FaPhoneAlt className=' w-[25px] h-[25px]' /> <span>+91-8722713327</span>
            </p>
            </div>
          </div>
          <div>

            <ul className=' flex flex-col gap-[18px]'>
              <h1 className=' poppins-semibold text-[24px] whitespace-nowrap underline underline-offset-[12px]'>Quick Links</h1>
              <li><NavLink className="text-white/70 inter-medium text-[14px] tracking-[0.5px]" to="/">HOME</NavLink> </li>
              <li><NavLink className="text-white/70 inter-medium text-[14px] tracking-[0.5px]" to="/policies">POLICIES</NavLink> </li>
              <li><NavLink className="text-white/70 inter-medium text-[14px] tracking-[0.5px]" to="/contact">GUIDE</NavLink> </li>
              <li><NavLink className="text-white/70 inter-medium text-[14px] tracking-[0.5px]" to="/renewals">RENEWALS</NavLink> </li>
              <li><NavLink className="text-white/70 inter-medium text-[14px] tracking-[0.5px]" to="/claims">CLAIMS</NavLink> </li>

            </ul>
          </div>

          <div>

            <ul className='flex-col flex gap-[18px]'>

              <h1 className='  poppins-semibold text-[24px] whitespace-nowrap underline underline-offset-[12px]'>Register Links</h1>
              <li><NavLink className="text-white/70 inter-medium text-[14px] tracking-[0.5px] uppercase" to="/signup">Signup Page </NavLink> </li>
              <li><NavLink className="text-white/70 inter-medium text-[14px] tracking-[0.5px] uppercase" to="/login">Login Page </NavLink> </li>
            </ul>
          </div>
          <div className=' flex flex-col gap-10'>
            <FaFacebook className=' w-[40px] h-[40px]' />
            <FaLinkedin className=' w-[40px] h-[40px]' />
            <FaXTwitter className=' w-[40px] h-[40px]' />
          </div>

        </div>

      </div>
      <div className=' w-[80%] h-[45px] text-[#714FAE] mx-auto flex justify-between items-center '>
        <p className='poppins-regular text-[14px]'>© 2011 All Rights Reserved Insura Connect Pvt Ltd</p>

        <div className=' flex items-center flex-row gap-2 text-[#714FAE]'>
          <NavLink className=" poppins-regular text-[14px] tracking-[0.5px]" to="/">Home page </NavLink> |
          <NavLink className="poppins-regular text-[14px] tracking-[0.5px]" to="/contact">Contact</NavLink> |
          <NavLink className=" poppins-regular text-[14px] tracking-[0.5px]" to="/">Privacy policy </NavLink>
        </div>
      </div>
    </div>



  )
}

export default Home