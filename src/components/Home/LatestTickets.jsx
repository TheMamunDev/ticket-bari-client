import React from 'react';
import { Link } from 'react-router-dom';
import TicketCard from '../Cards/TicketCard';
import { FaClock, FaArrowRight } from 'react-icons/fa';
import LoadingSpinner from '../Shared/Loader/LoadingSpinner';
import useFetch from '@/hooks/useFetch';
import DataFetchError from '../Shared/DataFetchError/DataFetchError';
import TicketCardSkeleton from '../Shared/Loader/TicketCardSkeleton';

const LatestTickets = () => {
  const {
    data: latestTickets = [],
    isLoading,
    error,
    isError,
    refetch,
  } = useFetch(['latest-tickets'], '/tickets/latest');

  if (isError) {
    const isNotFound = error?.response?.status === 404;
    if (isNotFound) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <div className="text-9xl mb-4">🎫</div>
          <h2 className="text-3xl font-bold text-base-content mb-2">
            Ticket Not Found
          </h2>
          <p className="text-base-content/60 mb-6 max-w-md">
            There Are No Latest Ticket Available At This Momment , Try Later .
            Thank You !
          </p>
        </div>
      );
    }
    return <DataFetchError error={error} refetch={refetch} />;
  }
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between md:items-end items-start mb-10 gap-4">
          <div className="flex justify-center flex-col items-start">
            <div className="flex items-center gap-2 text-primary font-bold mb-2">
              <FaClock />
              <span className="uppercase tracking-widest text-sm">
                Just Added
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-base-content">
              Latest Tickets
            </h2>
          </div>
          <Link
            to="/all-tickets"
            className="inline-flex items-center gap-2 btn btn-outline btn-primary group w-fit btn-sm md:btn-md"
          >
            View All Tickets
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TicketCardSkeleton count={8}></TicketCardSkeleton>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestTickets?.map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestTickets;
