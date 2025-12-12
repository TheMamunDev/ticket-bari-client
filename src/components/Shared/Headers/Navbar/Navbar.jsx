import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBus, FaBars, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { FiMenu, FiSun, FiMoon } from 'react-icons/fi';
import useAuth from '@/hooks/useAuth';
import { signOut } from 'firebase/auth';
import LoadingSpinner from '../../Loader/LoadingSpinner';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'react-toastify';

const Navbar = () => {
  const dashboardRoute = '/dashboard';
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logOut, loading } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      theme === 'dark' ? 'light' : 'dark'
    );
    localStorage.setItem('theme', theme);
  }, [theme]);

  function handleSignOut() {
    logOut()
      .then(() => {
        toast.success('Log Out Successfull');
      })
      .catch(error => {
        toast.error(error.message);
      });
  }
  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-primary font-bold' : 'font-medium'
          }
        >
          Home
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/all-tickets"
              className={({ isActive }) =>
                isActive ? 'text-primary font-bold' : 'font-medium'
              }
            >
              All Tickets
            </NavLink>
          </li>
          <li>
            <NavLink
              to={dashboardRoute}
              className={({ isActive }) =>
                isActive ? 'text-primary font-bold' : 'font-medium'
              }
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className=" bg-base-100/95 backdrop-blur-sm sticky top-0 z-50 border-b border-base-200 px-4 lg:px-8">
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden pl-0"
            >
              <FaBars className="text-xl" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-base-200"
            >
              {navOptions}
            </ul>
          </div>

          <Link
            to="/"
            className="flex items-center gap-2 text-xl md:text-2xl font-bold text-primary"
          >
            <FaBus className="text-2xl" />
            <span className="text-base-content">TicketBari</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{navOptions}</ul>
        </div>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
        >
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>
        <div className="navbar-end">
          {loading ? (
            <Badge className="text-white">
              <Spinner />
              Syncing
            </Badge>
          ) : user ? (
            <div className="flex items-center gap-2">
              <div className="hidden md:block text-right mr-2">
                <p className="text-sm font-bold text-base-content leading-tight">
                  {user.displayName}
                </p>
              </div>

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar border border-primary/20"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User Profile"
                      src={
                        user.photoURL ||
                        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-200"
                >
                  <Link
                    to={'/dashboard'}
                    className="px-4 py-2 border-b border-base-200 mb-2"
                  >
                    <span className="font-semibold text-primary">
                      My Profile
                    </span>
                  </Link>
                  <li>
                    <button
                      onClick={() => handleSignOut()}
                      className="text-error font-medium"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="btn btn-ghost btn-sm text-base-content"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-sm text-white"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
