import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaWifi,
  FaSnowflake,
  FaUtensils,
  FaCalendarAlt,
  FaClock,
} from 'react-icons/fa';

const TicketCard = ({ ticket }) => {
  const getTransportStyle = type => {
    switch (type.toLowerCase()) {
      case 'bus':
        return { icon: <FaBus />, color: 'badge-primary' };
      case 'train':
        return { icon: <FaTrain />, color: 'badge-secondary' };
      case 'launch':
        return { icon: <FaShip />, color: 'badge-info' };
      case 'plane':
        return { icon: <FaPlane />, color: 'badge-warning' };
      default:
        return { icon: <FaBus />, color: 'badge-ghost' };
    }
  };

  const { icon, color } = getTransportStyle(ticket.transportType);

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group h-full flex flex-col">
      <figure className="relative h-48 overflow-hidden shrink-0">
        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div
          className={`absolute top-3 right-3 badge ${color} badge-lg gap-2 text-white font-bold shadow-sm`}
        >
          {icon} {ticket.transportType}
        </div>

        <div className="absolute top-3 left-3 badge badge-neutral bg-opacity-80 backdrop-blur-sm text-white">
          {ticket.quantity} Seats Left
        </div>
      </figure>

      <div className="card-body p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h2
            className="card-title text-lg font-bold text-base-content line-clamp-1 w-2/3"
            title={ticket.title}
          >
            {ticket.title}
          </h2>
          <div className="text-right">
            <p className="text-xl font-extrabold text-primary">
              ${ticket.price}
            </p>
          </div>
        </div>

        <div className="text-sm text-base-content/70 mb-2 flex items-center gap-2">
          <span className="font-semibold">{ticket.from}</span>
          <span className="text-primary text-xs">●─────●</span>
          <span className="font-semibold">{ticket.to}</span>
        </div>

        <div className="flex gap-4 text-xs text-base-content/80 bg-base-200 p-2 rounded-lg mb-3">
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="text-primary" />
            <span>{ticket.departureDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaClock className="text-secondary" />
            <span>{ticket.departureTime}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {ticket.perks.slice(0, 3).map((perk, index) => (
            <div
              key={index}
              className="badge badge-outline badge-xs gap-1 py-2"
            >
              {perk === 'AC' && <FaSnowflake className="text-cyan-400" />}
              {perk === 'WiFi' && <FaWifi className="text-blue-400" />}
              {perk}
            </div>
          ))}
          {ticket.perks.length > 3 && (
            <span className="text-xs opacity-50">
              +{ticket.perks.length - 3} more
            </span>
          )}
        </div>

        <div className="mt-auto">
          <Link
            to={`/ticket/${ticket._id}`}
            className="btn btn-primary btn-sm w-full text-white font-bold"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
