import React from 'react';
import { FaStar } from 'react-icons/fa';
import TicketCard from '../Cards/TicketCard';

const Advertiesment = () => {
  const advertisedTickets = [
    {
      id: 101,
      title: "Dhaka to Cox's Bazar - Green Line",
      from: 'Dhaka',
      to: "Cox's Bazar",
      price: 1500,
      quantity: 12,
      transportType: 'Bus',
      perks: ['AC', 'WiFi', 'Water'],
      image:
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop',
    },
    {
      id: 102,
      title: 'Dhaka to Chittagong - Subarna Express',
      from: 'Dhaka',
      to: 'Chittagong',
      price: 850,
      quantity: 45,
      transportType: 'Train',
      perks: ['AC', 'Food'],
      image:
        'https://images.unsplash.com/photo-1474487548417-781cb714c2f3?q=80&w=2069&auto=format&fit=crop',
    },
    {
      id: 103,
      title: 'Barisal Luxury Cabin - Sundarban 10',
      from: 'Dhaka',
      to: 'Barisal',
      price: 2200,
      quantity: 5,
      transportType: 'Launch',
      perks: ['AC', 'Bed', 'TV', 'Dinner'],
      image:
        'https://images.unsplash.com/photo-1605281317010-fe5ffe355ca5?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: 104,
      title: 'Dhaka to Sylhet - US Bangla',
      from: 'Dhaka',
      to: 'Sylhet',
      price: 3500,
      quantity: 18,
      transportType: 'Plane',
      perks: ['AC', 'Snacks'],
      image:
        'https://images.unsplash.com/photo-1436491865332-7a615109cc02?q=80&w=2074&auto=format&fit=crop',
    },
    {
      id: 105,
      title: 'Chittagong to St. Martin - Keari Sindbad',
      from: 'Chittagong',
      to: 'St. Martin',
      price: 1800,
      quantity: 0, // Testing "0 Quantity" logic visually
      transportType: 'Ship',
      perks: ['Open Deck', 'Cafeteria'],
      image:
        'https://images.unsplash.com/photo-1596728328229-459203a11003?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: 106,
      title: 'Rajshahi to Dhaka - Padma Express',
      from: 'Rajshahi',
      to: 'Dhaka',
      price: 700,
      quantity: 30,
      transportType: 'Train',
      perks: ['AC', 'Prayer Room'],
      image:
        'https://images.unsplash.com/photo-1535535112387-56ffe8db21ff?q=80&w=2074&auto=format&fit=crop',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex justify-center items-center gap-2 mb-3">
            <FaStar className="text-yellow-400 text-xl" />
            <span className="text-secondary font-bold uppercase tracking-widest text-sm">
              Best Deals
            </span>
            <FaStar className="text-yellow-400 text-xl" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-base-content mb-4">
            Featured Travel Plans
          </h2>
          <p className="text-base-content/60 text-lg">
            Hand-picked by our team for the best comfort and value.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advertisedTickets.slice(0, 6).map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advertiesment;
