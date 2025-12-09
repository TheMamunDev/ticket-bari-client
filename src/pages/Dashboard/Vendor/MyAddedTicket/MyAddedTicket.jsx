import React, { use, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaBoxOpen } from 'react-icons/fa';
import Swal from 'sweetalert2';
import VendorTicketCard from '@/components/Cards/VendorTicketCard';
import useAuth from '@/hooks/useAuth';
import useFetch from '@/hooks/useFetch';
import LoadingSpinner from '@/components/Shared/Loader/LoadingSpinner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAxios from '@/hooks/useAxios';

const MyAddedTickets = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const secureApi = useAxios();

  const {
    data: initialTickets,
    isLoading,
    error,
  } = useFetch(
    ['my-added-tickets', user.email],
    `/tickets/vendor/${user.email}`,
    true
  );

  const deleteTicket = useMutation({
    mutationFn: async id => {
      try {
        const result = await secureApi.delete(`/tickets/${id}`);
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (res, data) => {
      console.log(data, res);
      queryClient.setQueryData(['my-added-tickets', user?.email], prevData => {
        return prevData.filter(item => item._id !== data);
      });
      if (data.data.deletedCount) {
        toast.success(`Successfully deleted the ticket`);
      }
    },
  });

  const handleDelete = ticket => {
    console.log(ticket);
    Swal.fire({
      title: `Are you sure you want to delete "${ticket.title}"?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#40916c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        deleteTicket.mutate(ticket._id);
        toast.info(`Ticket has been deleted.`, {
          position: 'top-center',
        });
      }
    });
  };

  const handleUpdate = ticket => {
    navigate(`/dashboard/vendor/update-ticket/${ticket._id}`);
  };

  if (loading || isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-base-content">
            My Added Tickets
          </h2>
          <p className="text-base-content/60">
            Manage your inventory and check status.
          </p>
        </div>

        <Link
          to="/dashboard/vendor/add-ticket"
          className="btn btn-primary text-white gap-2"
        >
          <FaPlus /> Add New Ticket
        </Link>
      </div>

      {initialTickets?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialTickets?.map(ticket => (
            <VendorTicketCard
              key={initialTickets.id}
              ticket={ticket}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-base-100 border-2 border-dashed border-base-300 rounded-xl">
          <FaBoxOpen className="text-6xl text-base-content/20 mb-4" />
          <h3 className="text-xl font-bold text-base-content/60">
            No Tickets Added Yet
          </h3>
          <Link
            to="/dashboard/vendor/add-ticket"
            className="btn btn-link no-underline mt-2"
          >
            Create your first ticket
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyAddedTickets;
