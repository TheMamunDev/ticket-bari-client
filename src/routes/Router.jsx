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
import UserProfile from '@/pages/Dashboard/User/UserProfile/UserProfile';
import MyBookedTickets from '@/pages/Dashboard/User/MyBookedTickets/MyBookedTickets';
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
      {
        path: 'user/profile',
        Component: UserProfile,
      },
      {
        path: 'user/booked-tickets',
        Component: MyBookedTickets,
      },
    ],
  },
]);
