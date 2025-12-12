import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBus, FaSearch, FaMapMarkedAlt } from 'react-icons/fa';

const NoAdvertisedTickets = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 120 },
    },
  };

  const floatTransition = {
    y: {
      duration: 2.5,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center bg-base-100 rounded-3xl border border-base-200 shadow-sm max-w-4xl mx-auto my-8"
    >
      <motion.div
        animate={{ y: ['-15px', '15px'] }}
        transition={floatTransition}
        className="relative mb-8"
      >
        <FaMapMarkedAlt className="text-8xl text-base-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 opacity-50" />

        <div className="relative z-10 flex items-center justify-center">
          <FaSearch className="text-5xl text-primary -mr-4 z-20 -translate-y-2" />
          <div className="bg-base-100 p-2 rounded-full z-10">
            <FaBus className="text-7xl text-secondary" />
          </div>
        </div>
      </motion.div>

      <motion.h3
        variants={itemVariants}
        className="text-2xl md:text-3xl font-bold text-base-content mb-3"
      >
        No Featured Journeys Right Now
      </motion.h3>

      <motion.p
        variants={itemVariants}
        className="text-base-content/70 max-w-lg mx-auto mb-8 text-lg"
      >
        Our editors are curating the next batch of top travel deals. Don't
        worry, we have hundreds of other amazing trips waiting for you!
      </motion.p>
      <motion.div variants={itemVariants}>
        <Link
          to="/all-tickets"
          className="btn btn-primary btn-lg text-white group relative overflow-hidden"
        >
          <span className="relative z-10">Explore All Tickets</span>
          <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-150 group-hover:bg-white/20"></div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NoAdvertisedTickets;
