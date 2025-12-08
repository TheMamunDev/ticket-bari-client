import React, { useState } from 'react';
import {
  FaHistory,
  FaSearch,
  FaFileInvoiceDollar,
  FaCheckCircle,
} from 'react-icons/fa';

const PaymentHistory = () => {
  const transactionsData = [
    {
      id: 1,
      transactionId: 'txn_3N5y...8A2d',
      amount: 3000,
      ticketTitle: "Dhaka to Cox's Bazar - Green Line",
      paymentDate: '2025-03-15',
      status: 'succeeded',
    },
    {
      id: 2,
      transactionId: 'txn_1A8z...9B3c',
      amount: 800,
      ticketTitle: 'Chittagong to Dhaka - Subarna',
      paymentDate: '2025-02-28',
      status: 'succeeded',
    },
    {
      id: 3,
      transactionId: 'txn_9X2k...4L1m',
      amount: 3500,
      ticketTitle: 'Dhaka to Sylhet - US Bangla',
      paymentDate: '2025-01-10',
      status: 'succeeded',
    },
    {
      id: 4,
      transactionId: 'txn_5M7p...2Q9r',
      amount: 2200,
      ticketTitle: 'Barisal Luxury Cabin - Sundarban 10',
      paymentDate: '2024-12-05',
      status: 'succeeded',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  // Simple Filter Logic for Search
  const filteredTransactions = transactionsData.filter(
    txn =>
      txn.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.ticketTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-base-content flex items-center gap-2">
            <FaHistory className="text-primary" /> Transaction History
          </h2>
          <p className="text-base-content/60 text-sm mt-1">
            View all your secure payments via Stripe.
          </p>
        </div>

        {/* Search Bar */}
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

      {/* Table Container */}
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* Table Head */}
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

            {/* Table Body */}
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((txn, index) => (
                  <tr key={txn.id} className="hover">
                    <th>{index + 1}</th>

                    {/* Transaction ID */}
                    <td className="font-mono text-xs md:text-sm text-primary font-bold">
                      {txn.transactionId}
                    </td>

                    {/* Ticket Title */}
                    <td>
                      <div
                        className="font-semibold text-sm max-w-[200px] truncate"
                        title={txn.ticketTitle}
                      >
                        {txn.ticketTitle}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="font-bold text-success">
                      ${txn.amount.toLocaleString()}
                    </td>

                    {/* Date */}
                    <td className="text-sm opacity-70">
                      {new Date(txn.paymentDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>

                    {/* Status Badge */}
                    <td className="text-center">
                      <div className="badge badge-success gap-1 text-white text-xs">
                        <FaCheckCircle /> Paid
                      </div>
                    </td>

                    {/* Invoice Action (Optional Polish) */}
                    <td className="text-center">
                      <button className="btn btn-ghost btn-xs text-base-content/50 hover:text-primary">
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

      {/* Bottom Summary */}
      <div className="mt-4 text-right text-xs text-base-content/50">
        Showing {filteredTransactions.length} records. All payments are secured
        by Stripe.
      </div>
    </div>
  );
};

export default PaymentHistory;
