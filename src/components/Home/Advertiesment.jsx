import React from 'react';
import { FaStar } from 'react-icons/fa';
import TicketCard from '../Cards/TicketCard';
import useFetch from '@/hooks/useFetch';
import LoadingSpinner from '../Shared/Loader/LoadingSpinner';

const Advertiesment = () => {
  const {
    data: advertisedTickets,
    isLoading,
    error,
  } = useFetch(['featured-tickets'], '/tickets/featured');

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <section className="py-16 md:py-24 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex justify-center items-center gap-2 mb-3">
            <FaStar className="text-yellow-400 text-xl" />
            <span className="text-secondary font-bold uppercase tracking-widest text-sm">
              Best Deals
            </span>
            <FaStar className="text-yellow-400 text-xl" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-base-content mb-4">
            Featured Travel Plans
          </h2>
          <p className="text-base-content/60 text-lg">
            Hand-picked by our team for the best comfort and value.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advertisedTickets.slice(0, 6).map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advertiesment;
