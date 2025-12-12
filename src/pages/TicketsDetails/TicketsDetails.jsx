import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaBus,
  FaWifi,
  FaSnowflake,
  FaUtensils,
  FaUserShield,
} from 'react-icons/fa';
import CountDown from '@/components/Shared/CountDown/CountDown';
import BookingModal from '@/components/Shared/BookingModal/BookingModal';
import useFetch from '@/hooks/useFetch';
import LoadingSpinner from '@/components/Shared/Loader/LoadingSpinner';
import useTitle from '@/hooks/useTitle';
import TicketDetailsSkeleton from '@/components/Shared/Loader/TicketDetailsSkeleton';
import useAuth from '@/hooks/useAuth';
import DataFetchError from '@/components/Shared/DataFetchError/DataFetchError';

const TicketDetails = () => {
  const { user, loading } = useAuth();
  const { id } = useParams();
  const {
    data: ticket,
    isLoading,
    error,
    isError,
    refetch,
  } = useFetch(['ticket', id], `/tickets/${id}`, true);
  useTitle(`Ticket Details - ${ticket?.title}`);

  const [isExpired, setIsExpired] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExpire = status => {
    setIsExpired(status);
  };

  const isBookDisabled =
    isExpired || ticket?.quantity === 0 || ticket?.status === 'rejected';

  let buttonText = 'Book Now';
  if (ticket?.quantity === 0) buttonText = 'Sold Out';
  if (isExpired) buttonText = 'Departure Time Passed';
  if (ticket?.status === 'rejected') buttonText = 'Ticket Rejected';

  const handleBookBtn = () => {
    setIsModalOpen(true);
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;
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
    <div className="bg-base-200 w-full px-4 sm:px-6 py-6 md:py-12">
      {isLoading ? (
        <TicketDetailsSkeleton></TicketDetailsSkeleton>
      ) : (
        <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-64 lg:h-full relative">
              <img
                src={ticket?.image}
                alt={ticket?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 badge badge-primary badge-lg">
                {ticket?.transportType}
              </div>
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-base-content mb-2">
                  {ticket?.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-base-content/60 mb-6">
                  <FaUserShield className="text-secondary" />
                  <span>
                    Provided by:{' '}
                    <span className="font-semibold">{ticket?.vendorName}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between bg-base-200 p-4 rounded-xl mb-8">
                  <div className="text-center">
                    <p className="text-xs opacity-60">From</p>
                    <p className="font-bold text-lg">{ticket?.from}</p>
                  </div>
                  <div className="flex flex-col items-center text-primary px-4">
                    <FaBus />
                    <span className="text-xs">----------------</span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs opacity-60">To</p>
                    <p className="font-bold text-lg">{ticket?.to}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-bold text-lg mb-2">Description</h3>
                  <p className="opacity-80 leading-relaxed mb-4">
                    {ticket?.description}
                  </p>

                  <h3 className="font-bold text-lg mb-2">Perks</h3>
                  <div className="flex flex-wrap gap-2">
                    {ticket?.perks.map((perk, i) => (
                      <div key={i} className="badge badge-outline p-3">
                        {perk === 'AC' && (
                          <FaSnowflake className="mr-1 text-cyan-500" />
                        )}
                        {perk === 'WiFi' && (
                          <FaWifi className="mr-1 text-blue-500" />
                        )}
                        {perk === 'Snacks' && (
                          <FaUtensils className="mr-1 text-orange-500" />
                        )}
                        {perk}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-base-300 pt-6">
                <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold opacity-60 mb-1">
                      Departure In:
                    </p>
                    {isExpired ? (
                      <span className="text-error font-bold text-xl">
                        Departed / Expired
                      </span>
                    ) : (
                      <CountDown
                        targetDate={ticket?.departureDate}
                        targetTime={ticket?.departureTime}
                        onExpire={handleExpire}
                      />
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-sm opacity-60">Price per person</p>
                    <p className="text-4xl font-extrabold text-primary">
                      ${ticket?.price}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleBookBtn}
                  disabled={isBookDisabled}
                  className="btn btn-primary btn-lg w-full text-white shadow-lg disabled:bg-gray-400 disabled:text-gray-700"
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BookingModal
        ticket={ticket}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default TicketDetails;
