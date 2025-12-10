import LoadingSpinner from '@/components/Shared/Loader/LoadingSpinner';
import useAuth from '@/hooks/useAuth';
import useAxios from '@/hooks/useAxios';
import useFetch from '@/hooks/useFetch';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaCheck, FaTimes, FaMapMarkerAlt, FaUserTie } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ManageTickets = () => {
  const { user, loading } = useAuth();
  const secureApi = useAxios();
  const queryClient = useQueryClient();
  const {
    data: tickets,
    isLoading,
    error,
  } = useFetch(['all-tickets-manage'], `/tickets/all`, true);

  const updateData = useMutation({
    mutationFn: async data => {
      try {
        const res = await secureApi.patch(`/tickets/status/${data.id}`, data);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (response, data) => {
      console.log(response, data);
      if (response.modifiedCount) {
        toast.success('Ticket Updated Successfully');
      }
      queryClient.setQueryData(['all-tickets-manage'], oldData => {
        console.log(oldData);
        return oldData.map(el =>
          el._id === data.id ? { ...el, status: data.status } : el
        );
      });
    },
  });

  const handleApprove = (id, newStatus) => {
    const newData = { id, status: newStatus };
    updateData.mutate(newData);
  };

  if (isLoading || loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-base-content">Manage Tickets</h2>
        <p className="text-base-content/60">
          Review and approve ticket listings from vendors.
        </p>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Ticket Details</th>
                <th>Route & Date</th>
                <th>Price & Qty</th>
                <th className="text-center">Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {tickets.length > 0 ? (
                tickets.map((ticket, index) => (
                  <tr key={ticket.id} className="hover">
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={ticket.image} alt="Ticket" />
                          </div>
                        </div>
                        <div>
                          <div
                            className="font-bold max-w-[200px] truncate"
                            title={ticket.title}
                          >
                            {ticket.title}
                          </div>
                          <div className="text-sm opacity-50 flex items-center gap-1">
                            <FaUserTie className="text-xs" />{' '}
                            {ticket.vendorName}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="text-sm font-semibold flex items-center gap-1">
                        {ticket.from} <span className="text-xs">➝</span>{' '}
                        {ticket.to}
                      </div>
                      <div className="text-xs opacity-60">
                        {ticket.departureDate}
                      </div>
                    </td>
                    <td>
                      <div className="font-bold">${ticket.price}</div>
                      <div className="text-xs opacity-60">
                        {ticket.quantity} seats
                      </div>
                    </td>

                    <td className="text-center">
                      <div
                        className={`badge ${
                          ticket.status === 'approved'
                            ? 'badge-success text-white'
                            : ticket.status === 'rejected'
                            ? 'badge-error text-white'
                            : 'badge-warning text-white'
                        } gap-2`}
                      >
                        {ticket.status}
                      </div>
                    </td>

                    <td className="text-center">
                      {ticket.status === 'pending' ? (
                        <div className="join">
                          <button
                            onClick={() =>
                              handleApprove(ticket._id, 'approved')
                            }
                            className="btn btn-success btn-xs join-item text-white tooltip"
                            data-tip="Approve"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() =>
                              handleApprove(ticket._id, 'rejected')
                            }
                            className="btn btn-error btn-xs join-item text-white tooltip"
                            data-tip="Reject"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">
                          Action Taken
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-400">
                    No tickets found.
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

export default ManageTickets;
