import React, { useState } from 'react';
import {
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaCreditCard,
} from 'react-icons/fa';
import CountDown from '../Shared/CountDown/CountDown';
import { Link } from 'react-router';

const BookedTicketCard = ({ booking, onPay }) => {
  const [isExpired, setIsExpired] = useState(false);

  const getStatusBadge = status => {
    switch (status) {
      case 'pending':
        return <div className="badge badge-warning text-white">Pending</div>;
      case 'accepted':
        return <div className="badge badge-success text-white">Accepted</div>;
      case 'rejected':
        return <div className="badge badge-error text-white">Rejected</div>;
      case 'paid':
        return <div className="badge badge-primary text-white">Paid</div>;
      default:
        return <div className="badge badge-ghost">Unknown</div>;
    }
  };

  const checkInitialExpiration = () => {
    const departureStr = `${booking.departureDate} ${booking.departureTime}`;
    const departureDate = new Date(departureStr);
    return new Date() > departureDate;
  };

  const handleTimerExpire = status => {
    setIsExpired(status);
  };

  const isPayEnabled = booking.status === 'accepted' && !isExpired;

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 flex flex-col h-full">
      <figure className="relative h-48">
        <img
          src={booking.ticketInfo.image}
          alt={booking.ticketTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 shadow-sm">
          {getStatusBadge(booking.status)}
        </div>
        <div className="absolute bottom-2 left-2 badge badge-neutral bg-opacity-80 text-white">
          Qty: {booking.bookingQuantity}
        </div>
      </figure>

      <div className="card-body p-5 flex-grow">
        <Link
          to={`/ticket/${booking.ticketId}`}
          className="card-title text-lg leading-tight mb-2"
        >
          {booking.ticketTitle}
        </Link>

        <div className="flex justify-between items-center mb-3 text-sm text-base-content/70">
          <span className="font-bold text-primary text-xl">
            ${booking.totalPrice}
          </span>
          <span className="text-xs">(Unit: ${booking.unitPrice})</span>
        </div>

        <div className="flex items-center gap-2 text-sm bg-base-200 p-2 rounded-lg mb-3">
          <FaMapMarkerAlt className="text-secondary" />
          <span className="font-semibold">{booking.from}</span>
          <span>→</span>
          <span className="font-semibold">{booking.to}</span>
        </div>

        <div className="flex justify-between text-xs text-base-content/70 mb-4">
          <div className="flex items-center gap-1">
            <FaCalendarAlt /> {booking.ticketInfo.departureDate}
          </div>
          <div className="flex items-center gap-1">
            <FaClock /> {booking.ticketInfo.departureTime}
          </div>
        </div>

        {booking.status !== 'rejected' && booking.status !== 'paid' && (
          <div className="mb-4">
            <p className="text-xs font-bold mb-1 opacity-60">Time Remaining:</p>
            {isExpired ? (
              <span className="text-error font-bold text-sm">
                Departure Time Passed
              </span>
            ) : (
              <div className="scale-75 origin-left -ml-2">
                <CountDown
                  targetDate={booking.ticketInfo.departureDate}
                  targetTime={booking.ticketInfo.departureTime}
                  onExpire={handleTimerExpire}
                />
              </div>
            )}
          </div>
        )}
        {booking.status === 'paid' && (
          <div className="alert alert-success text-white py-2 text-xs mb-4">
            <span>Payment Completed! Have a safe trip.</span>
          </div>
        )}
        {booking.status === 'rejected' && (
          <div className="alert alert-error text-white py-2 text-xs mb-4">
            <span>Booking request was rejected by vendor.</span>
          </div>
        )}
        <div className="card-actions mt-auto">
          {booking.status === 'accepted' && (
            <button
              onClick={() => onPay(booking)}
              disabled={!isPayEnabled}
              className="btn btn-primary w-full text-white btn-sm"
            >
              <FaCreditCard />
              {isExpired ? 'Expired' : 'Pay Now'}
            </button>
          )}

          {booking.status === 'pending' && (
            <button className="btn btn-ghost btn-sm w-full cursor-default border-base-300 bg-base-200">
              Waiting for Approval
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookedTicketCard;
