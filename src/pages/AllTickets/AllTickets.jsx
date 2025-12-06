import React, { useState } from 'react';
import TicketCard from '../../components/Cards/TicketCard';
import { FaFilter, FaSearch } from 'react-icons/fa';
import useFetch from '@/hooks/useFetch';
import LoadingSpinner from '@/components/Shared/Loader/LoadingSpinner';

const AllTickets = () => {
  const {
    data: tickets,
    isLoading,
    error,
  } = useFetch(['all-tickets'], '/tickets');

  const [searchTerm, setSearchTerm] = useState('');

  console.log(tickets);

  const handleSearch = e => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = allTicketsData.filter(
      ticket =>
        ticket.title.toLowerCase().includes(term) ||
        ticket.from.toLowerCase().includes(term) ||
        ticket.to.toLowerCase().includes(term)
    );
    setTickets(filtered);
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-base-100 p-6 rounded-xl shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-base-content">
              All Tickets
            </h1>
            <p className="text-base-content/60 mt-1">
              Browse available tickets for your next journey.
            </p>
          </div>
          <div className="mt-4 md:mt-0 w-full md:w-auto">
            <div className="join w-full">
              <div className="join-item btn btn-square bg-base-200 border-none no-animation">
                <FaSearch className="text-base-content/50" />
              </div>
              <input
                type="text"
                placeholder="Search by Route or Bus Name..."
                className="input input-bordered join-item w-full md:w-80 bg-base-200 border-none focus:outline-none"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>

        {tickets?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tickets?.map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎫</div>
            <h3 className="text-2xl font-bold text-base-content">
              No Tickets Found
            </h3>
            <p className="text-base-content/60">
              Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTickets;
