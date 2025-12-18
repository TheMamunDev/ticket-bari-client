import useAuth from '@/hooks/useAuth';
import useAxios from '@/hooks/useAxios';
import useImage from '@/hooks/useImage';
import useTitle from '@/hooks/useTitle';
import { useMutation } from '@tanstack/react-query';
import React, { useTransition } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { FaPaperPlane, FaUserTie } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const AddTicket = () => {
  useTitle('Add Ticket');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const transportTypeWatch = useWatch({
    control,
    name: 'transportType',
  });
  const navigate = useNavigate();
  const secureApi = useAxios();
  const { user, loading: authLoading } = useAuth();
  const [isTranstition, startTansition] = useTransition();

  const formateTime = time => {
    let [hour, minute] = time.split(':').map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:${minute.toString().padStart(2, '0')} ${ampm}`;
  };

  const addTicket = useMutation({
    mutationFn: async data => {
      try {
        const res = await secureApi.post('/tickets', data);
        return res.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data, insertedData) => {
      if (data.result.insertedId) {
        reset();
        toast.success('Ticket Added Successfully');
        Swal.fire({
          title: ` Ticket added Success `,
          text: 'See all yourtickets in my ticketspage!',
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#03C988',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Procced',
          cancelButtonText: 'Add Another One',
        }).then(result => {
          if (result.isConfirmed) {
            navigate('/dashboard/vendor/my-tickets');
          }
        });
      }
    },
    onError: error => {
      console.log(error);
      const message = error?.response?.data?.message || 'Something went wrong';
      toast.error(message, {
        position: 'top-center',
      });
    },
  });

  const onSubmit = async data => {
    startTansition(async () => {
      try {
        const formData = new FormData();
        const imageURL = await useImage(data.image[0]);
        formData.append('image', imageURL);
        const formattedTime = formateTime(data.departureTime);
        data.departureTime = formattedTime;
        const ticketData = {
          title: data.title,
          from: data.from,
          to: data.to,
          transportType: data.transportType,
          price: parseFloat(data.price),
          quantity: parseInt(data.quantity),
          departureDate: data.departureDate,
          departureTime: formattedTime,
          perks: data.perks || [],
          image: imageURL,
          vendorName: user.displayName,
          vendorEmail: user.email,
          status: 'pending',
          isAdvertised: false,
          createdAt: new Date(),
        };
        addTicket.mutate(ticketData);
      } catch (error) {
        console.error('Error adding ticket:', error);
        toast.error('Failed to add ticket.');
      }
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-base-content">Add New Ticket</h2>
        <p className="text-base-content/60">
          Fill out the details below to list a new journey.
        </p>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg mb-4 border-b pb-2 text-primary">
              Trip Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="form-control md:col-span-2">
                <label className="label font-semibold">Ticket Title</label>
                <input
                  type="text"
                  placeholder="e.g. Dhaka to Cox's Bazar - Luxury AC"
                  className="input input-bordered w-full"
                  {...register('title', { required: 'Title is required' })}
                />
                {errors.title && (
                  <span className="text-error text-xs mt-1">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label font-semibold">From (Departure)</label>
                <input
                  type="text"
                  placeholder="e.g. Dhaka"
                  className="input input-bordered w-full"
                  {...register('from', {
                    required: 'From location is required',
                  })}
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold">To (Destination)</label>
                <input
                  type="text"
                  placeholder="e.g. Chittagong"
                  className="input input-bordered w-full"
                  {...register('to', { required: 'To location is required' })}
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold">Transport Type</label>
                <select
                  className="select select-bordered w-full"
                  {...register('transportType', {
                    required: 'Please select a type',
                  })}
                >
                  <option value="">Select Type</option>
                  <option value="Bus">Bus</option>
                  <option value="Train">Train</option>
                  <option value="Launch">Launch</option>
                  <option value="Plane">Plane</option>
                </select>
              </div>

              {transportTypeWatch === 'Bus' ? (
                <div className="form-control">
                  <label className="label font-semibold">
                    Enter Bus Total Seat
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 40"
                    className="input input-bordered w-full"
                    {...register('quantity', {
                      required: 'Quantity is required',
                      min: 1,
                    })}
                  />
                </div>
              ) : (
                <div className="form-control">
                  <label className="label font-semibold">
                    Total Seats Available
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 40"
                    className="input input-bordered w-full"
                    {...register('quantity', {
                      required: 'Quantity is required',
                      min: 1,
                    })}
                  />
                </div>
              )}

              <div className="form-control">
                <label className="label font-semibold">Price (Per Unit)</label>
                <div className="input-group flex items-center">
                  <span className="bg-base-300 px-3 py-3 rounded-l-lg border border-r-0 border-base-300 font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="input input-bordered w-full rounded-l-none"
                    step="0.01"
                    {...register('price', { required: 'Price is required' })}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label font-semibold">Departure Date</label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  {...register('departureDate', {
                    required: 'Date is required',
                  })}
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold">Departure Time</label>
                <input
                  type="time"
                  className="input input-bordered w-full"
                  {...register('departureTime', {
                    required: 'Time is required',
                  })}
                />
              </div>
            </div>

            <h3 className="font-bold text-lg mb-4 border-b pb-2 text-primary mt-8">
              Details & Media
            </h3>

            <div className="form-control mb-6">
              <label className="label font-semibold">Amenities / Perks</label>
              <div className="flex flex-wrap gap-4">
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
                    className="cursor-pointer label border border-base-300 rounded-lg px-4 py-2 hover:bg-base-200 transition-colors"
                  >
                    <input
                      type="checkbox"
                      value={perk}
                      className="checkbox checkbox-primary checkbox-sm mr-2"
                      {...register('perks')}
                    />
                    <span className="label-text">{perk}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-control mb-6 flex flex-col space-y-2">
              <label className="label font-semibold">Ticket Image</label>
              <input
                type="file"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                accept="image/*"
                {...register('image', { required: 'Image is required' })}
              />
            </div>

            <div className="bg-base-200 p-4 rounded-xl mb-8">
              <h4 className="font-bold flex items-center gap-2 mb-3 text-sm opacity-70">
                <FaUserTie /> Vendor Information (Read-only)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label text-xs uppercase font-bold">
                    Name
                  </label>
                  <input
                    type="text"
                    value={user.displayName}
                    readOnly
                    className="input input-bordered input-sm bg-base-100"
                  />
                </div>
                <div className="form-control">
                  <label className="label text-xs uppercase font-bold">
                    Email
                  </label>
                  <input
                    type="text"
                    value={user.email}
                    readOnly
                    className="input input-bordered input-sm bg-base-100"
                  />
                </div>
              </div>
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary w-full text-lg text-white disabled:bg-primary disabled:text-white disabled:cursor-not-allowed`}
                disabled={isTranstition}
              >
                {isTranstition ? (
                  'Saving Ticket...'
                ) : (
                  <>
                    <FaPaperPlane /> Add Ticket
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTicket;
