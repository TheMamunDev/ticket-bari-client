import { Spinner } from '@/components/ui/spinner';
import useAuth from '@/hooks/useAuth';
import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { th } from 'zod/v4/locales';

const BookingModal = ({ ticket, isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  const watchQuantity = useWatch({ control, name: 'quantity' });
  const totalPrice = watchQuantity * ticket?.price || 0;
  const secureApi = useAxios();

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const insertData = useMutation({
    mutationFn: async data => {
      console.log('data from modal', data);
      try {
        const res = await secureApi.post('/bookings', data);
        return res.data;
      } catch (error) {
        throw error;
        console.log(error);
      }
    },
    onSuccess: (data, insertedData) => {
      if (data.insertedId) {
        onClose();
        Swal.fire({
          title: `${insertedData.ticketTitle} booked successfully`,
          text: 'Pay your ticket from dashboard before run out quantity.',
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#03C988',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Procced',
          cancelButtonText: 'Add Another One',
        }).then(result => {
          if (result.isConfirmed) {
            navigate('/dashboard/user/booked-tickets');
          }
        });
      }
    },
    onError: error => {
      if (error.response.data.type === 'ROLE_ERROR') {
        onClose();
        Swal.fire({
          icon: 'error',
          title: `${error.response.data.yourRole} can't book a ticket`,
          text: `only user can book a ticket `,
          confirmButtonText: 'Manage ticket',
          confirmButtonColor: '#03C988',
          cancelButtonColor: '#3085d6',
          showCancelButton: true,
          cancelButtonText: 'Cancel',
        }).then(result => {
          if (result.isConfirmed) {
            if (error.response.data.yourRole === 'admin') {
              navigate('/dashboard/admin/manage-tickets');
            } else {
              navigate('/dashboard/vendor/my-tickets');
            }
          } else {
            onClose();
          }
        });
      }
    },
  });
  const { isPending } = insertData;
  const onSubmit = data => {
    const bookingData = {
      ticketId: ticket._id,
      ticketTitle: ticket.title,
      quantity: parseInt(data.quantity),
      unitPrice: ticket.price,
      totalPrice: ticket.price * parseInt(data.quantity),
      status: 'pending',
      userName: user.displayName,
      userEmail: user.email,
      vendorEmail: ticket.vendorEmail,
      bookingDate: new Date().toISOString(),
    };

    insertData.mutate(bookingData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open bg-black/50 backdrop-blur-sm">
      <div className="modal-box relative">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </button>

        <h3 className="font-bold text-lg text-primary mb-4">
          Book Your Ticket
        </h3>
        <div className="py-2 mb-4 bg-base-200 p-4 rounded-lg">
          <p className="font-bold">{ticket.title}</p>
          <p className="text-sm opacity-70">Price per unit: ${ticket.price}</p>
          <p className="text-sm opacity-70">
            Available Seats: {ticket.quantity}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">How many tickets?</span>
            </label>
            <input
              type="number"
              min={1}
              placeholder="Enter quantity"
              className={`input input-bordered w-full ${
                errors.quantity ? 'input-error' : ''
              }`}
              {...register('quantity', {
                required: 'Quantity is required',
                min: { value: 1, message: 'Minimum 1 ticket' },
                max: {
                  value: ticket.quantity,
                  message: `Only ${ticket.quantity} seats available`,
                },
              })}
            />
            {errors.quantity && (
              <span className="text-error text-sm mt-1">
                {errors.quantity.message}
              </span>
            )}
          </div>
          <div className="flex justify-between items-center text-xl font-bold border-t pt-4 mb-6">
            <span>Total Pay:</span>
            <span className="text-primary">${totalPrice}</span>
          </div>

          <button
            disabled={isPending}
            type="submit"
            className="btn btn-primary w-full text-white disabled:bg-primary disabled:text-white"
          >
            {isPending ? <Spinner>Booking...</Spinner> : 'Book Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
