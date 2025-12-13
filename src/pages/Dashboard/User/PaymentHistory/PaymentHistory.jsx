import LoadingSpinner from '@/components/Shared/Loader/LoadingSpinner';
import PaymentInvoice from '@/components/Shared/PaymentInvoice.jsx/PaymentInvoice';
import useAuth from '@/hooks/useAuth';
import useFetch from '@/hooks/useFetch';
import React, { useState } from 'react';
import {
  FaHistory,
  FaSearch,
  FaFileInvoiceDollar,
  FaCheckCircle,
} from 'react-icons/fa';

const PaymentHistory = () => {
  const { user, loading } = useAuth();
  const {
    data: transactionsData,
    isLoading,
    error,
  } = useFetch(['payment-history', user.email], `/payment/${user.email}`, true);

  console.log(transactionsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const filteredTransactions = transactionsData?.filter(
    txn =>
      txn.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.ticketTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (isLoading || loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-base-content flex items-center gap-2">
            <FaHistory className="text-primary" /> Transaction History
          </h2>
          <p className="text-base-content/60 text-sm mt-1">
            View all your secure payments via Stripe.
          </p>
        </div>
        <div className="join shadow-sm">
          <div className="join-item btn btn-square bg-base-100 border-base-300 no-animation">
            <FaSearch className="text-base-content/50" />
          </div>
          <input
            type="text"
            placeholder="Search Txn ID or Title..."
            className="input input-bordered join-item bg-base-100 w-full md:w-64 focus:outline-none"
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-base-content">
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Ticket Title</th>
                <th>Amount</th>
                <th>Payment Date</th>
                <th className="text-center">Status</th>
                <th className="text-center">Invoice</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((txn, index) => (
                  <tr key={txn.id} className="hover">
                    <th>{index + 1}</th>
                    <td className="font-mono text-xs md:text-sm text-primary font-bold">
                      {txn.transactionId}
                    </td>
                    <td>
                      <div
                        className="font-semibold text-sm max-w-[200px] truncate"
                        title={txn.ticketTitle}
                      >
                        {txn.ticketTitle}
                      </div>
                    </td>

                    <td className="font-bold text-success">
                      ${txn.amount.toLocaleString()}
                    </td>
                    <td className="text-sm opacity-70">
                      {new Date(txn.paidAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>

                    <td className="text-center">
                      <div className="badge badge-success gap-1 text-white text-xs">
                        <FaCheckCircle /> {txn.paymentStatus}
                      </div>
                    </td>

                    <td className="text-center">
                      <button
                        onClick={() => setSelectedBooking(txn)}
                        className="btn btn-ghost btn-xs text-base-content/50 hover:text-primary"
                      >
                        <FaFileInvoiceDollar className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-10 text-base-content/50"
                  >
                    No transactions found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-right text-xs text-base-content/50">
        Showing {filteredTransactions.length} records. All payments are secured
        by Stripe.
      </div>
      {selectedBooking && (
        <PaymentInvoice
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
};

export default PaymentHistory;
