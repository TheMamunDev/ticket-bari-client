import React from 'react';
import { Link } from 'react-router';
import { FaArrowRight, FaBus, FaPlane, FaShip, FaTrain } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HeroSlider = () => {
  const sliderData = [
    {
      id: 'slide1',
      image:
        'https://media.easemytrip.com/media/Blog/Travel/638506155096897886/638506155096897886vTQR35.jpg',
      subtitle: 'Comfortable Bus Journeys',
      title: 'Travel Across the Country',
      description:
        'Book AC/Non-AC bus tickets to anywhere in Bangladesh instantly.',
      icon: <FaBus />,
      accentColor: 'from-blue-600 to-blue-400',
    },
    {
      id: 'slide2',
      image:
        'https://www.greatrail.com/media/21422756/kuranda-scenic-railway.jpg',
      subtitle: 'Scenic Train Rides',
      title: 'Experience Rail Travel',
      description: 'Secure your seat for a relaxing and scenic train journey.',
      icon: <FaTrain />,
      accentColor: 'from-emerald-600 to-emerald-400',
    },
    {
      id: 'slide3',
      image:
        'https://cdn-imgix.headout.com/media/images/ffa9cb2f0e53b004d97c33fd7abd4d59-23869---Dubai---From-Dubai-Marina--1-Hour-Sightseeing-Yacht-Cruise-with-Panoramic-Views---08.jpg?w=1041.6000000000001&h=651&crop=faces&auto=compress%2Cformat&fit=min',
      subtitle: 'Luxurious Launch Trips',
      title: 'Set Sail for Destinations',
      description:
        'Enjoy the serene rivers of Bangladesh with our premium launch partners.',
      icon: <FaShip />,
      accentColor: 'from-cyan-600 to-cyan-400',
    },
    {
      id: 'slide4',
      image:
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjMKRSYc0pA-TRXkt45KcrghgK2IWcOiItprq_yzh_BWTolC7_nhpkFKbQZd5sqTTuC6OBhAxNnYziYDwH3gDMkJw8oznKCgSE9CrREa5oSJCLl-5HgKHVG_9qjOzq8MSRmXAiUlboV0WRH/s1600/fastjet+landing%25281%2529.jpg',
      subtitle: 'Fast Domestic Flights',
      title: 'Reach in Minutes',
      description:
        'Skip the traffic and fly to major cities at affordable rates.',
      icon: <FaPlane />,
      accentColor: 'from-orange-600 to-orange-400',
    },
  ];

  const renderNav = (id, prevId, nextId) => (
    <div className="absolute z-50 flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a
        href={`#${prevId}`}
        className="btn btn-circle btn-primary opacity-50 hover:opacity-100 transition"
      >
        ❮
      </a>
      <a
        href={`#${nextId}`}
        className="btn btn-circle btn-primary opacity-50 hover:opacity-100 transition"
      >
        ❯
      </a>
    </div>
  );

  return (
    <div className="w-full relative overflow-hidden">
      <div className="carousel w-full h-[380px] md:h-[560px] rounded-xl shadow-xl">
        {sliderData.map((slide, index) => {
          const prevId =
            sliderData[(index - 1 + sliderData.length) % sliderData.length].id;
          const nextId = sliderData[(index + 1) % sliderData.length].id;
          return (
            <div
              key={slide.id}
              id={slide.id}
              className="carousel-item relative w-full"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full object-cover "
                style={{ objectPosition: 'center top' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-transparent">
                <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center md:justify-start text-center md:text-left">
                  <div className="max-w-2xl text-white mt-10 md:mt-0">
                    {/* Subtitle */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center justify-center md:justify-start gap-2 mb-3 md:mb-4"
                    >
                      <span
                        className={`p-2 rounded-full bg-gradient-to-r ${slide.accentColor} text-white text-sm md:text-xl`}
                      >
                        {slide.icon}
                      </span>
                      <h3 className="text-sm md:text-xl font-semibold uppercase tracking-widest text-gray-300">
                        {slide.subtitle}
                      </h3>
                    </motion.div>

                    {/* Title: Scaled down for mobile */}
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight"
                    >
                      <span
                        className={`bg-clip-text text-transparent bg-gradient-to-r ${slide.accentColor} from-white to-gray-200`}
                      >
                        {slide.title}
                      </span>
                    </motion.h1>

                    {/* Description: Smaller text on mobile */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="text-sm sm:text-base md:text-xl text-gray-300 mb-6 md:mb-8 max-w-sm md:max-w-xl mx-auto md:mx-0"
                    >
                      {slide.description}
                    </motion.p>

                    {/* Button */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Link
                        to="/all-tickets"
                        className={`btn btn-md md:btn-lg border-none text-white bg-gradient-to-r ${slide.accentColor} hover:brightness-110 gap-2 shadow-lg`}
                      >
                        Book Now
                        <FaArrowRight />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>

              {renderNav(sliderData.id, prevId, nextId)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSlider;
