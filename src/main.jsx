import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './context/AuthProvider';
import { RouterProvider } from 'react-router';
import { Router } from './routes/Router';
import { ToastContainer } from 'react-toastify';

AOS.init();

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer></ToastContainer>
      <AuthProvider>
        <RouterProvider router={Router}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
