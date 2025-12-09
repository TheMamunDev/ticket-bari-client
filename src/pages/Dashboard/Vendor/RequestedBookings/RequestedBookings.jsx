import LoadingSpinner from '@/components/Shared/Loader/LoadingSpinner';
import useAuth from '@/hooks/useAuth';
import useAxios from '@/hooks/useAxios';
import useFetch from '@/hooks/useFetch';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  FaCheck,
  FaTimes,
  FaUser,
  FaTicketAlt,
  FaSearch,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const RequestedBookings = () => {
  const { user, loading } = useAuth();
  const secureApi = useAxios();
  const queryClient = useQueryClient();
  const {
    data: bookings,
    isLoading,
    error,
  } = useFetch(
    ['booked-tickets', user.email],
    `/bookings/vendor/${user.email}`,
    true
  );

  const initialBookings = [
    {
      id: 1,
      userName: 'Rahim Uddin',
      userEmail: 'rahim@example.com',
      ticketTitle: "Dhaka to Cox's Bazar - Green Line AC",
      quantity: 2,
      unitPrice: 1500,
      totalPrice: 3000,
      status: 'pending',
    },
    {
      id: 2,
      userName: 'Karim Ahmed',
      userEmail: 'karim@test.com',
      ticketTitle: 'Chittagong to Sylhet - Paharika',
      quantity: 1,
      unitPrice: 600,
      totalPrice: 600,
      status: 'pending',
    },
    {
      id: 3,
      userName: 'Fatima Begum',
      userEmail: 'fatima@web.com',
      ticketTitle: "Dhaka to Cox's Bazar - Green Line AC",
      quantity: 4,
      unitPrice: 1500,
      totalPrice: 6000,
      status: 'accepted',
    },
    {
      id: 4,
      userName: 'John Doe',
      userEmail: 'john@doe.com',
      ticketTitle: 'Barisal to Dhaka - Launch VIP',
      quantity: 1,
      unitPrice: 2000,
      totalPrice: 2000,
      status: 'rejected',
    },
  ];

  const updateData = useMutation({
    mutationFn: async data => {
      try {
        const res = await secureApi.patch(`/bookings/${data.id}`, data);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (res, data) => {
      console.log(data, res);
      if (res.data.result.modifiedCount) {
        const message =
          data.status === 'accepted'
            ? 'Booking Accepted! User can now pay.'
            : 'Booking Rejected.';
        toast.success(message, {
          position: 'top-center',
        });
      }
      queryClient.setQueryData(['booked-tickets', user.email], oldData => {
        console.log(oldData);
        return oldData.map(el =>
          el._id === data.id ? { ...el, status: data.status } : el
        );
      });
    },
  });

  const handleStatusUpdate = (id, newStatus) => {
    const newData = { id, status: newStatus };
    updateData.mutate(newData);
  };
  if (loading || isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-base-content">
            Requested Bookings
          </h2>
          <p className="text-base-content/60">
            Manage incoming booking requests from users.
          </p>
        </div>

        <div className="flex gap-2">
          <div className="badge badge-warning gap-1 p-3">
            Pending: {bookings.filter(b => b.status === 'pending').length}
          </div>
          <div className="badge badge-success gap-1 text-white p-3">
            Accepted: {bookings.filter(b => b.status === 'accepted').length}
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>User Details</th>
                <th>Ticket Info</th>
                <th>Qty & Price</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <tr key={booking.id} className="hover:bg-base-100/50">
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="bg-neutral text-neutral-content rounded-full w-10">
                            <span className="text-xs">
                              <FaUser />
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{booking.userName}</div>
                          <div className="text-sm opacity-50">
                            {booking.userEmail}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="flex items-center gap-2">
                        <FaTicketAlt className="text-primary opacity-60" />
                        <span
                          className="font-medium max-w-xs truncate"
                          title={booking.ticketTitle}
                        >
                          {booking.ticketTitle}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="font-bold">
                        {booking.quantity} Tickets
                      </div>
                      <div className="text-sm text-primary">
                        ${booking.totalPrice}{' '}
                        <span className="text-xs opacity-50">
                          (${booking.unitPrice}/unit)
                        </span>
                      </div>
                    </td>

                    <td className="text-center">
                      {booking.status === 'pending' ? (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() =>
                              handleStatusUpdate(booking._id, 'accepted')
                            }
                            className="btn btn-sm btn-success text-white tooltip"
                            data-tip="Accept Request"
                          >
                            <FaCheck /> Accept
                          </button>

                          <button
                            onClick={() =>
                              handleStatusUpdate(booking._id, 'rejected')
                            }
                            className="btn btn-sm btn-error text-white tooltip"
                            data-tip="Reject Request"
                          >
                            <FaTimes /> Reject
                          </button>
                        </div>
                      ) : (
                        <div
                          className={`badge ${
                            booking.status === 'accepted'
                              ? 'badge-success'
                              : 'badge-error'
                          } text-white p-3 font-bold uppercase text-xs`}
                        >
                          {booking.status}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-10 text-base-content/50"
                  >
                    No booking requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestedBookings;
