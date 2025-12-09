import React from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../layout/Root';
import Home from '../pages/Home/Home/Home';
import Profile from '@/pages/Profile/Profile';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ProtectedRoute from './ProtectedRoute';
import AllTickets from '@/pages/AllTickets/AllTickets';
import TicketDetails from '@/pages/TicketsDetails/TicketsDetails';
import DashboardLayout from '@/layout/DashboardLayout';
import MyBookedTickets from '@/pages/Dashboard/User/MyBookedTickets/MyBookedTickets';
import PaymentHistory from '@/pages/Dashboard/User/PaymentHistory/PaymentHistory';
import PaymentSuccess from '@/pages/Dashboard/User/PaymentSuccess/PaymentSuccess';
import PaymentCancel from '@/pages/Dashboard/User/PaymentCancel/PaymentCancel';
import UserProfile from '@/pages/Dashboard/Profile/UserProfile';
import DashboardIndex from './DashboardIndex';
import VendorRoute from './VendorRoute';
import AddTicket from '@/pages/Dashboard/Vendor/AddTicket/AddTicket';
import MyAddedTickets from '@/pages/Dashboard/Vendor/MyAddedTicket/MyAddedTicket';
import UpdateTicket from '@/pages/Dashboard/Vendor/UpdateTicket/UpdateTicket';
import RequestedBookings from '@/pages/Dashboard/Vendor/RequestedBookings/RequestedBookings';
export const Router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        path: '/',
        index: true,
        Component: Home,
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile></Profile>
          </ProtectedRoute>
        ),
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
      {
        path: 'all-tickets',
        Component: AllTickets,
      },
      {
        path: 'ticket/:id',
        element: (
          <ProtectedRoute>
            <TicketDetails></TicketDetails>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout></DashboardLayout>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardIndex></DashboardIndex> },
      {
        path: 'vendor/profile',
        element: (
          <VendorRoute>
            <UserProfile></UserProfile>
          </VendorRoute>
        ),
      },
      {
        path: 'vendor/add-ticket',
        element: (
          <VendorRoute>
            <AddTicket></AddTicket>
          </VendorRoute>
        ),
      },
      {
        path: 'vendor/my-tickets',
        element: (
          <VendorRoute>
            <MyAddedTickets></MyAddedTickets>
          </VendorRoute>
        ),
      },
      {
        path: 'vendor/update-ticket/:id',
        element: (
          <VendorRoute>
            <UpdateTicket></UpdateTicket>
          </VendorRoute>
        ),
      },
      {
        path: 'vendor/bookings',
        element: (
          <VendorRoute>
            <RequestedBookings></RequestedBookings>
          </VendorRoute>
        ),
      },

      {
        path: 'user/profile',
        Component: UserProfile,
      },
      { path: 'user/booked-tickets', Component: MyBookedTickets },
      {
        path: 'user/payment-history',
        Component: PaymentHistory,
      },
      {
        path: 'user/payment-success',
        Component: PaymentSuccess,
      },
      {
        path: 'user/payment-cancelled',
        Component: PaymentCancel,
      },
    ],
  },
]);
