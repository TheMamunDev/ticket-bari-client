import React, { useEffect, useState } from 'react';
import TicketCard from '../../components/Cards/TicketCard';
import useFetch from '@/hooks/useFetch';
import SearchForm from '@/components/Shared/SearchForm/SearchForm';
import { Link, useNavigate, useSearchParams } from 'react-router';
import TicketCardSkeleton from '@/components/Shared/Loader/TicketCardSkeleton';
import useTitle from '@/hooks/useTitle';
import DataFetchError from '@/components/Shared/DataFetchError/DataFetchError';

const AllTickets = () => {
  useTitle('All Tickets');
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState({});
  const sort = searchParams.get('sort') || '';
  const navigate = useNavigate();
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 9;

  useEffect(() => {
    const fromQuery = searchParams.get('from')?.toLowerCase() || '';
    const toQuery = searchParams.get('to')?.toLowerCase() || '';
    const dateQuery = searchParams.get('date') || '';
    const transportQuery = searchParams.get('transport') || '';
    const sortQuery = searchParams.get('sort') || '';

    setQuery({
      from: fromQuery,
      to: toQuery,
      date: dateQuery,
      transport: transportQuery,
      sort: sortQuery,
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 9,
    });
  }, [searchParams]);

  const queryString = new URLSearchParams(query).toString();
  const { data, isLoading, error, isError, refetch } = useFetch(
    ['all-tickets', query, sort],
    `/tickets/?${queryString}`
  );
  const tickets = data?.result || [];

  const handleSortChange = value => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set('sort', value);
    else params.delete('sort');

    navigate(`/all-tickets?${params.toString()}`);
  };
  const handlePageChange = newPage => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage);
    navigate(`/all-tickets?${params.toString()}`);
  };

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
            There Are No Ticket Available At This Momment , Try Later . Thank
            You !
          </p>
          <Link to="/" className="btn btn-primary text-white">
            Home
          </Link>
        </div>
      );
    }
    return <DataFetchError error={error} refetch={refetch} />;
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mb-8 bg-base-100 p-6 rounded-xl shadow-sm">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-base-content ">
              All Tickets
            </h1>
            <p className="text-base-content/60 mt-1">
              Browse available tickets for your next journey.
            </p>
          </div>
          <div className="mt-4 md:mt-0 w-full md:w-auto">
            <div className="join w-full">
              <label className="label mr-5">
                <span className="label-text font-medium text-secondary">
                  Sort By
                </span>
              </label>
              <select
                name="sort"
                className="w-full bg-base-200 focus:outline-none font-bold text-lg placeholder-base-200 text-base-content"
                value={sort}
                onChange={e => handleSortChange(e.target.value)}
              >
                <option value="Default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
        <div className="my-14">
          <SearchForm></SearchForm>
        </div>

        <div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <TicketCardSkeleton count={9}></TicketCardSkeleton>
            </div>
          ) : (
            <>
              {tickets?.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tickets?.map(ticket => (
                      <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
                  </div>

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
                      Page {page} of {data?.totalPages}
                    </span>
                    <button
                      className="btn btn-sm"
                      disabled={page >= data?.totalPages}
                      onClick={() => handlePageChange(page + 1)}
                    >
                      {' '}
                      Next
                    </button>
                  </div>
                </>
              ) : (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTickets;
