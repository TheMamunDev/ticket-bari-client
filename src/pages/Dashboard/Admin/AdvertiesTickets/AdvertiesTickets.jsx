import DataFetchError from '@/components/Shared/DataFetchError/DataFetchError';
import LoadingSpinner from '@/components/Shared/Loader/LoadingSpinner';
import useAuth from '@/hooks/useAuth';
import useAxios from '@/hooks/useAxios';
import useFetch from '@/hooks/useFetch';
import useTitle from '@/hooks/useTitle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaBullhorn, FaCheck, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { is, th } from 'zod/v4/locales';

const AdvertiesTickets = () => {
  useTitle('Advertise Tickets');
  const { user, loading } = useAuth();
  const secureApi = useAxios();
  const queryClient = useQueryClient();
  const {
    data: tickets,
    isLoading,
    error,
    isError,
    refetch,
  } = useFetch(['all-tickets-adverties'], `/tickets/all`, true, {
    status: 'approved',
  });

  const advertisedCount = tickets?.filter(t => t.isAdvertised).length;

  const updateData = useMutation({
    mutationFn: async data => {
      try {
        const res = await secureApi.patch(
          `/tickets/advertise/${data.id}`,
          data
        );
        return res.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onSuccess: (response, data) => {
      if (response.modifiedCount) {
        toast.success('Ticket Updated Successfully');
      }
      queryClient.setQueryData(['all-tickets-adverties'], oldData => {
        return oldData.map(el =>
          el._id === data.id ? { ...el, isAdvertised: data.currentStatus } : el
        );
      });
    },
    onError: error => {
      console.log(error);
      toast.error(error.message || 'Something went wrong');
    },
  });

  const { isPending } = updateData;

  const handleToggleAdvertise = (id, currentStatus) => {
    if (!currentStatus && advertisedCount >= 6) {
      Swal.fire({
        icon: 'warning',
        title: 'Limit Reached',
        text: 'You can only advertise up to 6 tickets at a time. Please unadvertise one first.',
      });
      return;
    }
    const newData = { id, currentStatus: !currentStatus };
    updateData.mutate(newData);
  };
  if (isLoading || loading) return <LoadingSpinner></LoadingSpinner>;

  if (isError) {
    const isNotFound = error?.response?.status === 404;
    if (isNotFound) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <div className="text-9xl mb-4">🎫</div>
          <h2 className="text-3xl font-bold text-base-content mb-2">
            Adverties Tickets Not Found
          </h2>
          <p className="text-base-content/60 mb-6 max-w-md">
            There are something went wrong , please try again later.
          </p>
          <Link to="/" className="btn btn-primary text-white">
            Home
          </Link>
        </div>
      );
    }
    return <DataFetchError error={error} refetch={refetch} />;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-base-content">
            Advertise Tickets
          </h2>
          <p className="text-base-content/60">
            Highlight top tickets on the Homepage.
          </p>
        </div>

        <div
          className={`badge ${
            advertisedCount >= 6 ? 'badge-error text-white' : 'badge-primary'
          } p-4 text-sm font-bold`}
        >
          Slots Used: {advertisedCount} / 6
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Ticket Details</th>
                <th>Vendor</th>
                <th>Price</th>
                <th className="text-center">Advertisement Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((ticket, index) => (
                <tr key={ticket.id} className="hover">
                  <th>{index + 1}</th>

                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="rounded-xl w-16 h-10">
                          <img
                            src={ticket.image}
                            alt="Ticket"
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div
                        className="font-bold max-w-[200px] truncate"
                        title={ticket.title}
                      >
                        {ticket.title}
                      </div>
                    </div>
                  </td>

                  <td className="text-sm opacity-70">{ticket.vendorName}</td>

                  <td className="font-bold">${ticket.price}</td>

                  <td className="text-center">
                    {ticket.isAdvertised ? (
                      <div className="badge badge-accent text-white gap-2">
                        <FaBullhorn /> Live on Home
                      </div>
                    ) : (
                      <div className="badge badge-ghost opacity-50">Hidden</div>
                    )}
                  </td>

                  <td className="text-center">
                    {isPending ? (
                      'loading'
                    ) : (
                      <input
                        type="checkbox"
                        defaultValue={ticket.isAdvertised}
                        className={`toggle ${
                          ticket.isAdvertised ? 'toggle-accent' : 'toggle-base'
                        }`}
                        checked={ticket.isAdvertised}
                        onChange={() =>
                          handleToggleAdvertise(ticket._id, ticket.isAdvertised)
                        }
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-base-content/40 mt-4 text-center">
        Note: Changes reflect immediately on the user homepage.
      </p>
    </div>
  );
};

export default AdvertiesTickets;
