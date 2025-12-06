import React from 'react';
import { Link } from 'react-router-dom';
import TicketCard from '../Cards/TicketCard';
import { FaClock, FaArrowRight } from 'react-icons/fa';
import LoadingSpinner from '../Shared/Loader/LoadingSpinner';
import useFetch from '@/hooks/useFetch';

const LatestTickets = () => {
  const {
    data: latestTickets,
    isLoading,
    error,
  } = useFetch(['latest-tickets'], '/tickets/latest');

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
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

          <Link to="/all-tickets" className="btn btn-outline btn-primary group">
            View All Tickets
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestTickets.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestTickets;
