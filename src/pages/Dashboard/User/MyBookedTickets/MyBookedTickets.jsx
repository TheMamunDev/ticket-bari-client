import BookedTicketCard from '@/components/Cards/BookedTicketCard';
import LoadingSpinner from '@/components/Shared/Loader/LoadingSpinner';
import useAuth from '@/hooks/useAuth';
import useAxios from '@/hooks/useAxios';
import useFetch from '@/hooks/useFetch';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import Swal from 'sweetalert2';

const MyBookedTickets = () => {
  const [searchParams] = useSearchParams();
  const { user, loading } = useAuth();
  const secureApi = useAxios();
  const page = Number(searchParams.get('page')) || 1;
  const navigate = useNavigate();

  const { data, isLoading, error } = useFetch(
    ['my-bookings', user.email, page],
    `/bookings/${user.email}?page=${page}`,
    true
  );
  const handlePageChange = newPage => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage);
    navigate(`/dashboard/user/booked-tickets?${params.toString()}`);
  };

  const bookings = data?.result || [];
  const totalPages = data?.totalPages || 1;

  const payAmount = useMutation({
    mutationFn: async data => {
      try {
        const res = await secureApi.post('/pay', data);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (response, data) => {
      Swal.close();
      window.location.href = response.url;
    },
  });
  const handlePayNow = async booking => {
    const newData = {
      bookingId: booking._id,
      ticketTitle: booking.ticketTitle,
      totalPrice: booking.totalPrice,
      quantity: booking.quantity,
      userEmail: user.email,
      ticketId: booking.ticketId,
    };
    console.log(newData);

    const result = await Swal.fire({
      title: 'Proceed to Payment?',
      text: 'You will be redirected to Stripe checkout.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Pay Now',
    });

    if (!result.isConfirmed) return;
    Swal.fire({
      title: 'Processing Payment...',
      text: 'Please wait',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    payAmount.mutate(newData);
  };

  if (isLoading || loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-base-content">
            My Booked Tickets
          </h2>
          <p className="text-base-content/60">
            Manage your bookings and payments.
          </p>
        </div>
        <div className="badge badge-primary badge-outline gap-2 p-4 mt-4 md:mt-0">
          Total Bookings: {bookings.length}
        </div>
      </div>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map(booking => (
            <BookedTicketCard
              key={booking.id}
              booking={booking}
              onPay={handlePayNow}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-base-100 rounded-xl">
          <h3 className="text-xl font-bold">No Bookings Found</h3>
          <p className="text-base-content/60">
            You haven't booked any tickets yet.
          </p>
        </div>
      )}
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="btn btn-sm"
          disabled={page <= 1}
          onClick={() => handlePageChange(page - 1)}
        >
          {' '}
          Prev
        </button>
        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-sm"
          disabled={page >= totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          {' '}
          Next
        </button>
      </div>
    </div>
  );
};

export default MyBookedTickets;
