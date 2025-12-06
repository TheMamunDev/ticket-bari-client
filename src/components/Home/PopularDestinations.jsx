import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

const destinations = [
  {
    id: 1,
    name: "Cox's Bazar",
    count: '150+ Buses Daily',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/9/92/Cox%27s_Bazar_sea_beach_01.jpg',
    size: 'col-span-1 md:col-span-2 md:row-span-2', // Big Box
  },
  {
    id: 2,
    name: 'Sylhet',
    count: '80+ Buses & Trains',
    image:
      'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/d5/de/52.jpg',
    size: 'col-span-1 md:col-span-1 md:row-span-1', // Small Box
  },
  {
    id: 3,
    name: 'Saint Martin',
    count: '10+ Ships Daily',
    image:
      'https://cdn.sanity.io/images/nxpteyfv/goguides/0461eb5084b1c686035cd4d174997ab31c42bb95-1600x1066.jpg',
    size: 'col-span-1 md:col-span-1 md:row-span-1', // Small Box
  },
  {
    id: 4,
    name: 'Sajek Valley',
    count: '40+ Jeeps Available',
    image:
      'https://i.pinimg.com/736x/50/10/4a/50104a5ba9bea452159dc69c656a64cf.jpg',
    size: 'col-span-1 md:col-span-2 md:row-span-1', // Wide Box
  },
];

const PopularDestinations = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
            Popular Destinations
          </h2>
          <p className="text-base-content/60">
            Explore the most visited places by our travelers this month.
          </p>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[500px]">
          {destinations.map(place => (
            <div
              key={place.id}
              className={`relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer ${place.size}`}
            >
              {/* Background Image */}
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-primary text-lg" />
                      {place.name}
                    </h3>
                    <p className="text-gray-300 text-sm">{place.count}</p>
                  </div>

                  <Link
                    to="/all-tickets"
                    className="btn btn-circle btn-primary btn-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <FaArrowRight className="text-white" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
