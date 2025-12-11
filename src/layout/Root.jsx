import React from 'react';

import { Outlet } from 'react-router';

import Navbar from '@/components/Shared/Headers/Navbar/Navbar';
import Footer from '@/components/Shared/Footer/Footer/Footer';
import { ToastContainer } from 'react-toastify';

const Root = () => {
  return (
    <div className="">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto m-0">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
