import React from 'react';

import { Outlet } from 'react-router';

import Navbar from '@/components/Shared/Headers/Navbar/Navbar';
import Footer from '@/components/Shared/Footer/Footer/Footer';

const Root = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <main className="min-h-[calc(100vh-300px)] max-w-7xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
