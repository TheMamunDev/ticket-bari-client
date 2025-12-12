import React from 'react';
import {
  FaEdit,
  FaTrash,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const VendorTicketCard = ({ ticket, onUpdate, onDelete }) => {
  const getStatusBadge = status => {
    switch (status) {
      case 'pending':
        return (
          <div className="badge badge-warning text-white gap-1">
            <FaClock /> Pending
          </div>
        );
      case 'approved':
        return (
          <div className="badge badge-success text-white gap-1">
            <FaCheckCircle /> Approved
          </div>
        );
      case 'rejected':
        return (
          <div className="badge badge-error text-white gap-1">
            <FaTimesCircle /> Rejected
          </div>
        );
      default:
        return <div className="badge badge-ghost">Unknown</div>;
    }
  };

  const isActionDisabled = ticket.status === 'rejected';

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 h-full flex flex-col group">
      <figure className="relative h-48 overflow-hidden">
        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 shadow-sm">
          {getStatusBadge(ticket.status)}
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
          <p className="text-xs font-bold opacity-80 uppercase">
            {ticket.transportType}
          </p>
          <p className="font-bold text-lg">${ticket.price}</p>
        </div>
      </figure>

      <div className="card-body p-5 flex-grow">
        <h2 className="card-title text-base font-bold leading-tight mb-3 min-h-[3rem]">
          {ticket.title}
        </h2>
        <div className="text-sm text-base-content/70 mb-4 flex items-center gap-2">
          <FaMapMarkerAlt className="text-primary" />
          <span className="font-semibold">{ticket.from}</span>
          <span>→</span>
          <span className="font-semibold">{ticket.to}</span>
        </div>
        <div className="flex justify-between items-center text-xs opacity-60 mb-4 bg-base-200 p-2 rounded-lg">
          <span>📅 {ticket.departureDate}</span>
          <span>💺 {ticket.quantity} Seats</span>
        </div>
        {ticket.status === 'rejected' && (
          <div className="alert alert-error text-white py-2 text-xs mb-4">
            <span>Admin Reason: {ticket.feedback || 'Policy Violation'}</span>
          </div>
        )}
        <div className="card-actions grid grid-cols-2 gap-3 mt-auto">
          <button
            onClick={() => onUpdate(ticket)}
            disabled={isActionDisabled}
            className="btn btn-sm btn-outline btn-info w-full"
          >
            <FaEdit /> Update
          </button>
          <button
            onClick={() => onDelete(ticket)}
            disabled={isActionDisabled}
            className="btn btn-sm btn-outline btn-error w-full"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorTicketCard;
