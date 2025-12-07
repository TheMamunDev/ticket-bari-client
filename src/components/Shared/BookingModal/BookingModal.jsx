import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const BookingModal = ({ ticket, isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const watchQuantity = watch('quantity', 1);
  const totalPrice = watchQuantity * ticket?.price || 0;

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = data => {
    const bookingData = {
      ticketId: ticket.id,
      ticketTitle: ticket.title,
      quantity: parseInt(data.quantity),
      totalPrice: ticket.price * parseInt(data.quantity),
      status: 'pending',
      bookingDate: new Date().toISOString(),
    };

    console.log('Booking Submitted to DB:', bookingData);
    alert("Booking Successful! Check 'My Booked Tickets'.");
    onClose();
    navigate('/dashboard/user/booked-tickets');
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

          <button type="submit" className="btn btn-primary w-full text-white">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
