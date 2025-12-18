import React, { useState } from 'react';
import {
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaCreditCard,
} from 'react-icons/fa';
import CountDown from '../Shared/CountDown/CountDown';
import { Link, useSearchParams } from 'react-router';
import Swal from 'sweetalert2';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAxios from '@/hooks/useAxios';

const BookedTicketCard = ({ booking, onPay }) => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const secureApi = useAxios();
  const [isExpired, setIsExpired] = useState(false);
  const queryClient = useQueryClient();

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

  const handleTimerExpire = status => {
    setIsExpired(status);
  };

  console.log(booking.userEmail);

  const deleteTicket = useMutation({
    mutationFn: async id => {
      try {
        const result = await secureApi.delete(`/bookings/${id}`);
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (res, bookingId) => {
      console.log(bookingId);
      if (res.data.deletedCount) {
        toast.success('Successfully deleted the ticket');
        queryClient.setQueryData(
          ['my-bookings', booking.userEmail, page],
          prevData => {
            if (!prevData) return prevData;
            return {
              ...prevData,
              result: prevData.result.filter(item => item._id !== bookingId),
              totalItems: prevData.totalItems - 1,
            };
          }
        );
      }
    },
  });

  const handleDelete = ticket => {
    console.log(ticket);
    Swal.fire({
      title: `Are you sure you want to delete "${ticket.ticketTitle}"?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#40916c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        deleteTicket.mutate(ticket._id);
      }
    });
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
          Qty: {booking.quantity}
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
          <span className="font-semibold">{booking.ticketInfo.from}</span>
          <span>→</span>
          <span className="font-semibold">{booking.ticketInfo.to}</span>
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
        <div className="card-actions mt-auto flex flex-col md:flex-row justify-center gap-2">
          <div className="flex-1 w-full">
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

          <div className="flex-1 w-full">
            {booking.status === 'pending' && (
              <button
                onClick={() => handleDelete(booking)}
                className="btn btn-warning w-full text-white btn-sm"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookedTicketCard;
