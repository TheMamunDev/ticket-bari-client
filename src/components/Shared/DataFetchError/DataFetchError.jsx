import React from 'react';
import { FaExclamationTriangle, FaRedoAlt } from 'react-icons/fa';

const DataFetchError = ({ error, refetch, className = '' }) => {
  const errorMessage =
    error?.message || 'Something went wrong while loading data.';

  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 text-center bg-base-100 rounded-xl border border-error/20 ${className}`}
    >
      <div className="bg-error/10 p-4 rounded-full mb-4 animate-pulse">
        <FaExclamationTriangle className="text-4xl text-error" />
      </div>

      <h3 className="text-lg font-bold text-base-content mb-2">
        Unable to Load Data
      </h3>
      <p className="text-base-content/60 max-w-md mb-6 text-sm">
        {errorMessage}
      </p>
      {refetch && (
        <button
          onClick={() => refetch()}
          className="btn btn-error btn-outline btn-sm gap-2 hover:bg-error hover:text-white transition-all"
        >
          <FaRedoAlt className="animate-spin-slow-on-hover" />
          Try Again
        </button>
      )}
      <style jsx>{`
        .btn:hover .animate-spin-slow-on-hover {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default DataFetchError;
