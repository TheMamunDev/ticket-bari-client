import React from 'react';
import { motion } from 'framer-motion';
import {
  FaBus,
  FaUsers,
  FaGlobeAsia,
  FaAward,
  FaUserShield,
} from 'react-icons/fa';
import useTitle from '@/hooks/useTitle';

const About = () => {
  useTitle('About Us');
  return (
    <div className="bg-base-100 min-h-screen max-w-11/12 mx-auto">
      <div className="relative h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            About <span className="text-primary">TicketBari</span>
          </motion.h1>
          <p className="text-gray-200 text-lg max-w-2xl">
            Revolutionizing the way Bangladesh travels. One ticket at a time.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-base-content mb-6">
            Who We Are
          </h2>
          <p className="text-base-content/70 leading-relaxed mb-4">
            Founded in 2024, TicketBari started with a simple mission: to
            eliminate the hassle of standing in long queues for travel tickets.
            We recognized that in a digital age, booking a bus, train, or launch
            seat should be as easy as ordering food online.
          </p>
          <p className="text-base-content/70 leading-relaxed">
            Today, we connect thousands of travelers with hundreds of transport
            operators across the country. Whether you are going home for Eid or
            planning a corporate trip, TicketBari is your trusted travel
            partner.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://i.ibb.co.com/zVYh9Y0T/Whisk-386ac22878730b496dc42ccefd22a71ddr.jpg"
            alt="Travel"
            className="rounded-2xl shadow-lg mt-8"
          />
          <img
            src="https://dscdn.daily-sun.com/english/uploads/news_photos/2024/04/08/1712554396-fee4e47f3e4c529b1f2c751035a4492c.gif"
            alt="Bus"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>
      <div className="bg-base-200 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-white">
            <div className="stat place-items-center">
              <div className="stat-title">Happy Travelers</div>
              <div className="stat-value text-primary">50K+</div>
              <div className="stat-desc">Across the country</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Routes Covered</div>
              <div className="stat-value text-secondary">120+</div>
              <div className="stat-desc">Connecting 64 districts</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Partner Vendors</div>
              <div className="stat-value text-accent">500+</div>
              <div className="stat-desc">Verified operators</div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              icon: <FaBus />,
              title: 'Wide Network',
              desc: 'Access to buses, trains, launches & flights in one place.',
            },
            {
              icon: <FaUserShield />,
              title: 'Safety First',
              desc: 'We only partner with verified and safe transport operators.',
            },
            {
              icon: <FaGlobeAsia />,
              title: '24/7 Support',
              desc: 'Our customer support team is always ready to help you.',
            },
            {
              icon: <FaAward />,
              title: 'Best Prices',
              desc: 'No hidden charges. Get the best market rates guaranteed.',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="card bg-base-100 shadow-xl border border-base-200 text-center p-6"
            >
              <div className="text-4xl text-primary mx-auto mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-xl mb-2">{item.title}</h3>
              <p className="text-sm opacity-70">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
