import React, { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaSave,
  FaArrowLeft,
  FaBus,
  FaPlane,
  FaTrain,
  FaShip,
} from 'react-icons/fa';
import useAuth from '@/hooks/useAuth';
import useFetch from '@/hooks/useFetch';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useTime from '@/hooks/useTime';
import useAxios from '@/hooks/useAxios';
import { toast } from 'react-toastify';

const UpdateTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: fetchedData,
    isLoading: fetchLoading,
    error,
  } = useFetch(['update-ticket', id], `/tickets/${id}`, true);

  const queryClient = useQueryClient();
  const secureApi = useAxios();

  const updateData = useMutation({
    mutationFn: async data => {
      try {
        const result = await secureApi.patch(`/tickets/${id}`, data);
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (data, postData) => {
      console.log(data.data, 'from success');
      if (data.data.modifiedCount) {
        toast.success('Ticket Updated Successfull');
      }
      queryClient.setQueryData(['my-added-tickets', user?.email], oldData => {
        return oldData.map(el =>
          el._id === postData._id ? { ...el, ...postData } : el
        );
      });
    },
  });

  const onSubmit = data => {
    const newData = {
      ...fetchedData,
      ...data,
      departureTime: useTime(data.departureTime),
    };
    updateData.mutate(newData);
  };

  if (fetchLoading || loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  function convertAmPmTo24(timeStr) {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-circle btn-ghost"
        >
          <FaArrowLeft />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-base-content">
            Update Ticket
          </h2>
          <p className="text-base-content/60 text-sm">
            Modify trip details and pricing.
          </p>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="form-control md:col-span-2">
                <label className="label font-semibold">Ticket Title</label>
                <input
                  type="text"
                  defaultValue={fetchedData.title}
                  className="input input-bordered w-full"
                  {...register('title', { required: 'Title is required' })}
                />
                {errors.title && (
                  <span className="text-error text-xs">
                    {errors.title.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label font-semibold">From</label>
                <input
                  type="text"
                  defaultValue={fetchedData.from}
                  className="input input-bordered w-full"
                  {...register('from', { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label font-semibold">To</label>
                <input
                  type="text"
                  defaultValue={fetchedData.to}
                  className="input input-bordered w-full"
                  {...register('to', { required: true })}
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold">Transport Type</label>
                <select
                  defaultValue={fetchedData.transportType}
                  className="select select-bordered w-full"
                  {...register('transportType')}
                >
                  <option value="Bus">Bus</option>
                  <option value="Train">Train</option>
                  <option value="Launch">Launch</option>
                  <option value="Plane">Plane</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label font-semibold">Seat Capacity</label>
                <input
                  type="number"
                  defaultValue={fetchedData.quantity}
                  className="input input-bordered w-full"
                  {...register('quantity', { required: true, min: 1 })}
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold">Price (Per Unit)</label>
                <div className="input-group flex items-center">
                  <span className="bg-base-300 px-3 py-3 rounded-l-lg border border-r-0 border-base-300 font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    step="1"
                    defaultValue={fetchedData.price}
                    className="input input-bordered w-full rounded-l-none"
                    {...register('price', { required: true })}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label font-semibold">Departure Date</label>
                <input
                  type="date"
                  defaultValue={fetchedData.departureDate}
                  className="input input-bordered w-full"
                  {...register('departureDate', { required: true })}
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold">Departure Time</label>
                <input
                  type="time"
                  className="input input-bordered w-full"
                  defaultValue={convertAmPmTo24(fetchedData.departureTime)}
                  {...register('departureTime', { required: true })}
                />
              </div>
            </div>
            <div className="form-control mb-6">
              <label className="label font-bold text-lg border-b pb-2 mb-2">
                Amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  'AC',
                  'WiFi',
                  'Food',
                  'Blanket',
                  'TV',
                  'Charging Port',
                  'Sleeping Coach',
                ].map(perk => (
                  <label
                    key={perk}
                    className="cursor-pointer label justify-start gap-3 border border-base-200 rounded-lg hover:bg-base-100"
                  >
                    <input
                      type="checkbox"
                      value={perk}
                      defaultChecked={fetchedData.perks.includes(perk)}
                      className="checkbox checkbox-primary checkbox-sm"
                      {...register('perks')}
                    />
                    <span className="label-text">{perk}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-control mb-8">
              <label className="label font-semibold">Image URL</label>
              <input
                type="url"
                defaultValue={fetchedData.image}
                className="input input-bordered w-full"
                {...register('image', { required: 'Image URL is required' })}
              />
              <label className="label">
                <span className="label-text-alt text-warning">
                  Note: Uploading a new file will replace the current URL.
                </span>
              </label>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="btn btn-primary flex-1 text-white gap-2"
              >
                <FaSave /> Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTicket;
