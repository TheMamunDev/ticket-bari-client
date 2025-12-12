import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) return 1;

  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        className="btn btn-sm disabled:bg-primary"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>

      <span className="font-semibold">
        Page {page} of {totalPages}
      </span>

      <button
        className="btn btn-sm"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
