import React from 'react';

const TicketCardSkeleton = ({ count = 9 }) => {
  const skeletons = Array(count).fill(0);

  return (
    <>
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="card bg-base-100 shadow-xl border border-base-200 h-full flex flex-col animate-pulse"
        >
          <div className="h-48 w-full bg-base-300 shrink-0 rounded-t-2xl relative">
            <div className="absolute top-3 right-3 h-6 w-20 bg-base-200/50 rounded-full"></div>
            <div className="absolute top-3 left-3 h-6 w-24 bg-base-200/50 rounded-full"></div>
          </div>

          <div className="card-body p-5 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-2">
              <div className="h-6 bg-base-300 rounded w-2/3"></div>
              <div className="h-7 bg-base-300 rounded w-1/4"></div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-4 bg-base-300 rounded w-1/3"></div>
              <div className="h-3 bg-base-300 rounded w-8"></div>
              <div className="h-4 bg-base-300 rounded w-1/3"></div>
            </div>
            <div className="h-10 bg-base-300 rounded-lg mb-4 w-full"></div>
            <div className="flex gap-2 mb-4">
              <div className="h-6 w-16 bg-base-300 rounded-full"></div>
              <div className="h-6 w-16 bg-base-300 rounded-full"></div>
              <div className="h-6 w-16 bg-base-300 rounded-full"></div>
            </div>
            <div className="mt-auto">
              <div className="h-8 bg-base-300 rounded-lg w-full"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TicketCardSkeleton;
