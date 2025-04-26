import React, { useState, useEffect } from "react";


const Carousel = () => {


  const slides = [
    { id: 1, title : "Life Insurance" , alt: "Slide 1", },
    { id: 2, title : "Car Insurance" ,  alt: "Slide 2" ,},
    { id: 3, title : "Home Insurance" ,  alt: "Slide 3",  },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="relative h-[346px] rounded-[14px]  pl-2.5 max-sm:max-h-[200px] py-15  max-lg:w-full mx-auto bg-[#714FAE]">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-lg ">
        {/* Slides */}
        <div
          className="flex max-sm:min-h-[200px] h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="flex-shrink-0 w-full h-full relative bg-[#714FAE] px-[100px]   flex flex-col justify-between gap-[10px]"
              style={{ flexBasis: "100%" }}
            >
             
             <div className="  text-white flex flex-col justify-between h-full gap-[30px]  ">
              <div className="w-2/3 flex flex-col  justify-between h-full gap-[10px]">
              <p className=" nunito-sans font-semibold text-[16px] opacity-[80%]">{slide.title}</p>
              <h1 className="nunito-sans font-black text-[32px] leading-[48px]">Get financial protection for your family with affordable term.</h1>
              <p className=" nunito-sans font-semibold text-[16px] opacity-[80%]">Pick the Best Life Insurance</p>

              </div>
              <button className="bg-white rounded-[11px] py-[8px] px-[36px] text-black" >
                Learn More
              </button>
             </div>
             

            </div>
          ))}
        </div>
      </div>

      {/* Previous Button */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-5 z-10 transform -translate-y-1/2 backdrop-blur-xl bg-[#153F29]/70 hover:bg-black/50 text-white px-2 py-2 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32px" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-5 z-10 transform -translate-y-1/2 backdrop-blur-xl bg-[#153F29]/70 hover:bg-black/50 text-white px-2 py-2 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32px" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex
              ? "bg-blue-500"
              : "bg-gray-300 hover:bg-gray-400"
              }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
