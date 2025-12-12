import React from 'react';
import { motion } from 'framer-motion';
import { FaBus } from 'react-icons/fa';

const LoadingSpinner = () => {
  const busVariants = {
    jump: {
      y: [-10, 5],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    },
  };

  const shadowVariants = {
    pulse: {
      scale: [1, 0.8],
      opacity: [0.3, 0.6],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-base-100/90 backdrop-blur-sm">
      <div className="relative flex flex-col items-center">
        <motion.div
          variants={busVariants}
          animate="jump"
          className="text-6xl text-primary mb-2"
        >
          <FaBus />
        </motion.div>

        <motion.div
          variants={shadowVariants}
          animate="pulse"
          className="w-12 h-2 bg-black/20 rounded-full blur-sm mb-6"
        />
        <h3 className="text-xl font-bold text-base-content tracking-widest flex items-end">
          TICKETBARI
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1] }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.2,
              times: [0, 0.5, 1],
            }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.4,
              times: [0, 0.5, 1],
            }}
          >
            .
          </motion.span>
        </h3>
      </div>
    </div>
  );
};

export default LoadingSpinner;
