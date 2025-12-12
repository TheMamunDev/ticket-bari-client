import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Bus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

const slides = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop',
    label: 'COMFORTABLE BUS JOURNEYS',
    title: 'Travel Across the Country',
    desc: 'Book AC/Non-AC bus tickets to anywhere in Bangladesh instantly.',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop',
    label: 'SAFE & SECURE',
    title: 'Experience the Luxury',
    desc: 'Premium amenities and safety features for your peace of mind.',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop',
    label: 'AFFORDABLE RATES',
    title: 'Your Journey Begins Here',
    desc: 'Get the best deals on bus tickets for your next vacation.',
  },
];

const HeroSliderSafe = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className=" h-[400px] md:h-[500px] w-full m-auto py-4 px-4 relative group mb-5">
      <div
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500 relative overflow-hidden"
        style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 text-white space-y-6">
          <div className="flex items-center gap-2 animate-fadeIn">
            <div className="p-1.5 bg-blue-500 rounded-full">
              <Bus size={16} className="text-white" />
            </div>
            <span className="text-sm md:text-base font-semibold tracking-wider uppercase">
              {slides[currentIndex].label}
            </span>
          </div>
          <h1 className="text-3xl md:text-6xl font-bold leading-tight max-w-2xl drop-shadow-lg">
            {slides[currentIndex].title}
          </h1>
          <p className="text-gray-200 text-sm md:text-lg max-w-lg">
            {slides[currentIndex].desc}
          </p>
          <button
            onClick={() => navigate('/all-tickets')}
            className="w-fit mt-4 btn btn-primary text-white py-3 px-6 rounded-md font-semibold flex items-center gap-2 transition-all duration-300 transform hover:translate-x-1"
          >
            Book Now <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <div
        className=" group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-2 text-2xl rounded-full p-2 bg-black/20 hover:bg-black/50 text-white cursor-pointer transition-colors backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft size={30} />
      </div>
      <div
        className=" group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-2 text-2xl rounded-full p-2  bg-black/20 hover:bg-black/50 text-white cursor-pointer transition-colors backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight size={30} />
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => setCurrentIndex(slideIndex)}
            className={`transition-all duration-300 cursor-pointer rounded-full ${
              currentIndex === slideIndex
                ? 'p-1.5 px-4 bg-blue-500'
                : 'p-1.5 bg-gray-400/50'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSliderSafe;
