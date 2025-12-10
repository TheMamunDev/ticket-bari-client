import LoadingSpinner from '@/components/Shared/Loader/LoadingSpinner';
import useAuth from '@/hooks/useAuth';
import useAxios from '@/hooks/useAxios';
import useFetch from '@/hooks/useFetch';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  FaUserShield,
  FaStore,
  FaBan,
  FaCheckCircle,
  FaUser,
  FaTrashAlt,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { is } from 'zod/v4/locales';

const ManageUsers = () => {
  const { user, loading } = useAuth();
  const secureApi = useAxios();
  const queryClient = useQueryClient();
  const { data: users, isLoading, error } = useFetch(['all-users'], `/user`);

  const updateData = useMutation({
    mutationFn: async data => {
      try {
        const res = await secureApi.patch(`/user/role/${data.user._id}`, data);
        return res.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (response, data) => {
      console.log(data);
      if (response?.modifiedCount) {
        toast.success('User Updated Successfully');
        queryClient.setQueryData(['all-users'], oldData => {
          return oldData.map(el =>
            el._id === data.user._id
              ? { ...el, role: data.status, isFraud: false }
              : el
          );
        });
      }
    },
    onError: error => {
      console.log('onError:', error);
      const message = error?.response?.data?.message || 'Something went wrong';
      toast.error(message, {
        position: 'top-center',
      });
    },
  });

  const updateAsFraud = useMutation({
    mutationFn: async data => {
      try {
        const res = await secureApi.patch(`/user/fraud/${data.user._id}`, data);
        return res.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (response, data) => {
      console.log(response, data);
      if (response?.updatedUser.modifiedCount) {
        toast.success('User Updated As Fraud Successfully');
        queryClient.setQueryData(['all-users'], oldData => {
          console.log('cache data', oldData);
          return oldData.map(el =>
            el._id === data.user._id ? { ...el, isFraud: true } : el
          );
        });
      }
    },
    onError: error => {
      console.log('onError:', error);
      const message = error?.response?.data?.message || 'Something went wrong';
      toast.error(message, {
        position: 'top-center',
      });
    },
  });

  const handleRole = (user, newRole) => {
    const newData = { user, status: newRole };
    console.log(newData);
    updateData.mutate(newData);
  };

  const handleMarkFraud = user => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will hide all their tickets and disable new listings!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, mark as Fraud!',
    }).then(result => {
      if (result.isConfirmed) {
        updateAsFraud.mutate({ user, isFraud: true });

        // const updatedUsers = users.map(u =>
        //   u.id === user.id ? { ...u, isFraud: true } : u
        // );
        // Swal.fire('Marked!', 'Vendor has been marked as Fraud.', 'success');
      }
    });
  };

  if (isLoading || loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-base-content">Manage Users</h2>
        <p className="text-base-content/60">
          Control user roles and monitor vendor integrity.
        </p>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-center">Role Actions</th>
                <th className="text-center">Security Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="hover">
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-10 h-10">
                          <img src={user.photo} alt="Avatar" />
                        </div>
                      </div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </td>

                  <td>{user.email}</td>

                  <td>
                    <div
                      className={`badge ${
                        user.role === 'admin'
                          ? 'badge-primary'
                          : user.role === 'vendor'
                          ? 'badge-secondary'
                          : 'badge-ghost'
                      } text-white uppercase text-xs font-bold`}
                    >
                      {user.role}
                    </div>
                  </td>

                  <td className="text-center">
                    <div className="join">
                      <button
                        onClick={() => handleRole(user, 'admin')}
                        disabled={user.role === 'admin'}
                        className="btn btn-xs join-item btn-primary text-white tooltip"
                        data-tip="Make Admin"
                      >
                        <FaUserShield />
                      </button>
                      <button
                        onClick={() => handleRole(user, 'vendor')}
                        disabled={user.role === 'vendor'}
                        className="btn btn-xs join-item btn-secondary text-white tooltip"
                        data-tip="Make Vendor"
                      >
                        <FaStore />
                      </button>
                    </div>
                  </td>

                  <td className="text-center">
                    {user.role === 'vendor' ? (
                      user.isFraud ? (
                        <div className="badge badge-error gap-2 text-white font-bold">
                          <FaBan /> FRAUD DETECTED
                        </div>
                      ) : (
                        <button
                          onClick={() => handleMarkFraud(user)}
                          className="btn btn-error btn-xs text-white gap-2"
                        >
                          <FaBan /> Mark Fraud
                        </button>
                      )
                    ) : (
                      <span className="text-gray-300 text-xs">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
