import React from 'react';

const TicketDetailsSkeleton = () => {
  return (
    <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden animate-pulse border border-base-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        <div className="h-64 lg:h-full lg:min-h-[600px] bg-base-300 relative shrink-0">
          <div className="absolute top-4 left-4 h-8 w-24 bg-base-200/50 rounded-full"></div>
        </div>
        <div className="p-8 lg:p-12 flex flex-col justify-between h-full">
          <div>
            <div className="h-10 bg-base-300 rounded-lg w-3/4 mb-4"></div>
            <div className="h-5 bg-base-300 rounded w-1/3 mb-6"></div>
            <div className="h-24 bg-base-300 rounded-xl mb-8 w-full"></div>

            <div className="mb-8">
              <div className="h-7 bg-base-300 rounded w-1/4 mb-3"></div>
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-base-300 rounded w-full"></div>
                <div className="h-4 bg-base-300 rounded w-11/12"></div>
                <div className="h-4 bg-base-300 rounded w-4/5"></div>
              </div>

              <div className="h-7 bg-base-300 rounded w-1/6 mb-3"></div>
              <div className="flex flex-wrap gap-2">
                <div className="h-10 w-24 bg-base-300 rounded-full"></div>
                <div className="h-10 w-20 bg-base-300 rounded-full"></div>
                <div className="h-10 w-28 bg-base-300 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="border-t border-base-300 pt-6 mt-4">
            <div className="mb-6 flex flex-col md:flex-row items-end justify-between gap-4">
              <div className="w-full md:w-auto">
                <div className="h-4 w-24 bg-base-300 rounded mb-2"></div>
                <div className="flex gap-2">
                  <div className="h-14 w-14 bg-base-300 rounded-lg"></div>
                  <div className="h-14 w-14 bg-base-300 rounded-lg"></div>
                  <div className="h-14 w-14 bg-base-300 rounded-lg"></div>
                  <div className="h-14 w-14 bg-base-300 rounded-lg"></div>
                </div>
              </div>

              <div className="text-right">
                <div className="h-4 w-24 bg-base-300 rounded ml-auto mb-2"></div>
                <div className="h-10 w-32 bg-base-300 rounded ml-auto"></div>
              </div>
            </div>

            <div className="h-16 bg-base-300 rounded-lg w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsSkeleton;
