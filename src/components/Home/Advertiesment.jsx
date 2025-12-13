import React from 'react';
import { FaClock, FaStar } from 'react-icons/fa';
import TicketCard from '../Cards/TicketCard';
import useFetch from '@/hooks/useFetch';
import LoadingSpinner from '../Shared/Loader/LoadingSpinner';
import { Link } from 'react-router';
import NoAdvertisedTickets from './NoAdvertisedTickets';
import TicketCardSkeleton from '../Shared/Loader/TicketCardSkeleton';
import { Sparkles } from 'lucide-react';
import FeaturedTicketCard from '../Cards/FeaturedTicketCard';

const Advertiesment = () => {
  const {
    data: advertisedTickets = [],
    isLoading,
    error,
    isError,
    refetch,
  } = useFetch(['featured-tickets'], '/tickets/featured');

  if (advertisedTickets.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-base-200 px-4">
        <NoAdvertisedTickets />
      </section>
    );
  }

  if (isError) {
    return <DataFetchError error={error} refetch={refetch} />;
  }

  return (
    <section className="pt-16 md:pt-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-100 shadow-sm mb-2 animate-fade-in-up">
          <Sparkles
            size={16}
            className="text-pink-500 fill-pink-500 animate-pulse"
          />
          <span className="text-sm font-bold tracking-wide text-pink-600 uppercase">
            Best Deals
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-10">
          Featured Travel Plans
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TicketCardSkeleton count={6}></TicketCardSkeleton>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {advertisedTickets.map(ticket => (
              <FeaturedTicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Advertiesment;
