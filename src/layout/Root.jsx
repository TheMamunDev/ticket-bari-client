import React from 'react';

import { Outlet } from 'react-router';

import Navbar from '@/components/Shared/Headers/Navbar/Navbar';
import Footer from '@/components/Shared/Footer/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import ScrollToTop from '@/components/Shared/Utils/ScrollToTop';

const Root = () => {
  return (
    <div>
      <ScrollToTop />
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
