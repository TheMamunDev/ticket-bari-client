import React from 'react';
import Marquee from 'react-fast-marquee';

const operators = [
  {
    id: 1,
    name: 'Green Line',
    logo: 'https://greenlinebd.com/wp-content/uploads/2020/08/glp-logo.png',
  },
  {
    id: 2,
    name: 'Hanif',
    logo: 'https://static-busbd.bdtickets.com/busbdmedia/company_5kjmfkgrh3nj9v25zf97qpjbz8s1279d18q',
  },
  {
    id: 3,
    name: 'Ena Transport',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqB9es-pg_pDSAfiCkctQjkzsUT4PCeavEyQ&s',
  },
  {
    id: 4,
    name: 'Biman Bangladesh',
    logo: 'https://cdn.worldvectorlogo.com/logos/biman-bangladesh-airlines.svg',
  },
  {
    id: 5,
    name: 'US-Bangla Airlines',
    logo: 'https://images.seeklogo.com/logo-png/34/1/us-bangla-airlines-logo-png_seeklogo-342226.png',
  },
  {
    id: 6,
    name: 'Dhaka Mass',
    logo: 'https://images.seeklogo.com/logo-png/43/1/dhaka-mass-transit-company-limited-dmtcl-logo-png_seeklogo-433037.png',
  },
];

const BusPartners = () => {
  return (
    <section className="py-12 bg-base-100">
      <div className="container mx-auto px-4 mb-8 text-center">
        <h2 className="text-3xl font-bold text-base-content mb-2">
          Official Partners
        </h2>
        <p className="text-base-content max-w-lg mx-auto">
          We are authorized ticket sellers for the top bus operators in
          Bangladesh.
        </p>
      </div>

      <Marquee
        pauseOnHover={true}
        speed={50}
        gradient={true}
        gradientColor="white"
      >
        <div className="flex gap-5 md:gap-12 pl-12 items-center">
          {operators.map(op => (
            <div
              key={op.id}
              className="w-32 h-20 bg-base-200 border border-gray-100 shadow-sm rounded-xl flex items-center justify-center p-4 cursor-pointer transition-all duration-300 hover:shadow-md grayscale hover:grayscale-0 opacity-70 hover:opacity-100"
            >
              <img
                src={op.logo}
                alt={op.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default BusPartners;
