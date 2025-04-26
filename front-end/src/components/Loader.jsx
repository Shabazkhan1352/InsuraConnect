import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loader = () => {
  return (
    <div className='  flex justify-center items-center h-[100vh]'>
      <div className='rounded-full bg-black w-30 h-30 overflow-hidden'>
      <DotLottieReact 
      src="https://lottie.host/7cb4b265-bd0f-4c10-9dfe-100d66264dc9/AffgzRElVB.lottie"
      loop
      autoplay
    />
      </div>
     
    </div>
    
  );
};

export default Loader
