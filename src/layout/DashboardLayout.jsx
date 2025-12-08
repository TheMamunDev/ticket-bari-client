import React, { useState } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import {
  FaBars,
  FaHome,
  FaUser,
  FaTicketAlt,
  FaHistory,
  FaPlusCircle,
  FaListAlt,
  FaMoneyBillWave,
  FaUsers,
  FaBullhorn,
  FaSignOutAlt,
  FaBell,
  FaSearch,
} from 'react-icons/fa';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const user = {
    role: 'user',
    name: 'Mahmud Hasan',
    email: 'mahmud@example.com',
    photo:
      'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
  };

  const getPageTitle = () => {
    const path = location.pathname.split('/').pop();
    return path.replace(/-/g, ' ').toUpperCase();
  };

  const renderSidebarLinks = () => {
    const activeClass = 'bg-primary text-primary-content font-bold';
    const baseClass = 'text-base-content hover:bg-base-200';

    const LinkItem = ({ to, icon: Icon, label, toolTip }) => (
      <li
        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
        data-tip={toolTip}
      >
        <NavLink
          to={to}
          className={`is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings" ${({
            isActive,
          }) => (isActive ? activeClass : baseClass)}`}
        >
          <Icon className="text-lg " />{' '}
          <span className="is-drawer-close:hidden">{label} </span>
        </NavLink>
      </li>
    );

    if (user.role === 'user') {
      return (
        <>
          <LinkItem
            to="/dashboard/user/profile"
            icon={FaUser}
            label="User Profile"
            toolTip="Profile"
          />
          <LinkItem
            to="/dashboard/user/booked-tickets"
            icon={FaTicketAlt}
            label="My Booked Tickets"
            toolTip="My Booked Tickets"
          />
          <LinkItem
            to="/dashboard/user/transactions"
            icon={FaHistory}
            label="Transaction History"
            toolTip="Transaction History"
          />
        </>
      );
    } else if (user.role === 'vendor') {
      return (
        <>
          <LinkItem
            to="/dashboard/vendor/profile"
            icon={FaUser}
            label="Vendor Profile"
            toolTip="Profile"
          />
          <LinkItem
            to="/dashboard/vendor/add-ticket"
            icon={FaPlusCircle}
            label="Add Ticket"
            toolTip="Add Ticket"
          />
          <LinkItem
            to="/dashboard/vendor/my-tickets"
            icon={FaListAlt}
            label="My Added Tickets"
            toolTip="My Added Tickets"
          />
          <LinkItem
            to="/dashboard/vendor/bookings"
            icon={FaTicketAlt}
            label="Requested Bookings"
            toolTip="Requested Bookings"
          />
          <LinkItem
            to="/dashboard/vendor/revenue"
            icon={FaMoneyBillWave}
            label="Revenue Overview"
            toolTip="Revenue Overview"
          />
        </>
      );
    } else if (user.role === 'admin') {
      return (
        <>
          <LinkItem
            to="/dashboard/admin/profile"
            icon={FaUser}
            label="Admin Profile"
          />
          <LinkItem
            to="/dashboard/admin/manage-tickets"
            icon={FaTicketAlt}
            label="Manage Tickets"
          />
          <LinkItem
            to="/dashboard/admin/manage-users"
            icon={FaUsers}
            label="Manage Users"
          />
          <LinkItem
            to="/dashboard/admin/advertise"
            icon={FaBullhorn}
            label="Advertise Tickets"
          />
        </>
      );
    }
  };

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300 sticky top-0 z-40">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="h-16 flex items-center px-6 border-b border-base-200 bg-base-100 sticky top-0 z-20">
              <Link
                to="/"
                className="flex items-center gap-2 text-2xl font-bold text-primary"
              >
                <FaTicketAlt />
                <span className="text-base-content">TicketBari</span>
              </Link>
            </div>
          </nav>
          <div className=" p-4 md:p-8 flex-grow">
            <Outlet></Outlet>
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 is-drawer-close:pt-16 is-drawer-open:pt-0">
            <ul className="menu w-full grow">
              <div className="mb-4 px-2 is-drawer-close:hidden">
                <span className="badge badge-outline badge-primary w-full py-3 uppercase font-bold tracking-widest text-xs">
                  {user.role} Panel
                </span>
              </div>
              {renderSidebarLinks()}
              <div className="divider my-4"></div>
              <li
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Home"
              >
                <NavLink to="/">
                  <FaHome className="text-lg" />{' '}
                  <span className="is-drawer-close:hidden"> Back to Home</span>
                </NavLink>
              </li>
            </ul>
            <div
              className="mt-auto p-4 border-t border-base-200 is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Logout"
            >
              <button className="is-drawer-open:btn btn-outline btn-error w-full gap-2">
                <FaSignOutAlt />{' '}
                <span className="is-drawer-close:hidden">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
