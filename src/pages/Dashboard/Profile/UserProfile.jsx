import LoadingSpinner from '@/components/Shared/Loader/LoadingSpinner';
import useAuth from '@/hooks/useAuth';
import useFetch from '@/hooks/useFetch';
import React, { useState } from 'react';
import {
  FaEnvelope,
  FaUserShield,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
} from 'react-icons/fa';
import ProfileModal from './ProfileModal';
import useTitle from '@/hooks/useTitle';
import DataFetchError from '@/components/Shared/DataFetchError/DataFetchError';

const UserProfile = () => {
  useTitle('Profile');
  const { user, loading } = useAuth();
  const { data, isLoading, error, isError, refetch } = useFetch(
    ['user', user?.email],
    `/user/${user?.email}`
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading || isLoading) return <LoadingSpinner></LoadingSpinner>;

  if (isError) {
    const isNotFound = error?.response?.status === 404;
    if (isNotFound) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <div className="text-9xl mb-4">🎫</div>
          <h2 className="text-3xl font-bold text-base-content mb-2">
            Ticket Not Found
          </h2>
          <p className="text-base-content/60 mb-6 max-w-md">
            The ticket you are looking for might have been removed or the link
            is invalid.
          </p>
          <Link to="/all-tickets" className="btn btn-primary text-white">
            Browse All Tickets
          </Link>
        </div>
      );
    }
    return <DataFetchError error={error} refetch={refetch} />;
  }

  return (
    <div className="w-full mx-auto">
      <div className="card bg-base-100 shadow-xl overflow-hidden mb-8">
        <div className="h-48 bg-gradient-to-r from-primary to-secondary relative">
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute top-4 right-4 btn btn-circle btn-sm btn-ghost text-white bg-black/20 hover:bg-black/40"
          >
            <FaEdit />
          </button>
        </div>

        <div className="card-body pt-0 relative">
          <div className="absolute -top-16 left-8">
            <div className="avatar online">
              <div className="w-32 h-32 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-4 shadow-lg">
                <img
                  src={user?.photoURL}
                  alt="Profile"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-4 sm:ml-40 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h2 className="text-3xl font-bold text-base-content">
                {user?.displayName}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="badge badge-primary badge-outline uppercase font-bold text-xs tracking-wider">
                  {data?.role}
                </span>
                <span className="text-sm text-base-content/60">
                  Member since {data?.joinDate}
                </span>
              </div>
            </div>

            <div className="mt-4 sm:mt-0 flex gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary btn-sm text-white"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-md border border-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg border-b pb-2 mb-4">
              Contact Information
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-xs text-base-content/60 uppercase font-bold">
                    Email Address
                  </p>
                  <p className="font-semibold">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/10 text-secondary rounded-lg">
                  <FaPhone />
                </div>
                <div>
                  <p className="text-xs text-base-content/60 uppercase font-bold">
                    Phone Number
                  </p>
                  <p className="font-semibold">{data?.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 text-accent rounded-lg">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-xs text-base-content/60 uppercase font-bold">
                    Location
                  </p>
                  <p className="font-semibold">{data?.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-md border border-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg border-b pb-2 mb-4">
              Account Status
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-success/10 text-success rounded-lg">
                  <FaUserShield />
                </div>
                <div>
                  <p className="text-xs text-base-content/60 uppercase font-bold">
                    Authentication Type
                  </p>
                  <div className="badge badge-success gap-2 text-white mt-1">
                    {data.authType}
                  </div>
                </div>
              </div>

              <div className="alert bg-base-200 text-sm mt-6">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-info shrink-0 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>
                    Welcome back! You have full access to book tickets.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfileModal
        user={user}
        userData={data}
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default UserProfile;
