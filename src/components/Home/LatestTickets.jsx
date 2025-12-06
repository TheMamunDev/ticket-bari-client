import React from 'react';
import { Link } from 'react-router-dom';
import TicketCard from '../Cards/TicketCard';
import { FaClock, FaArrowRight } from 'react-icons/fa';

const LatestTickets = () => {
  // DUMMY DATA: Simulating "Recently Added" tickets (Sorted by Date Descending in real app)
  const latestTickets = [
    {
      id: 201,
      title: 'Dhaka to Khulna - Hanif Enterprise',
      from: 'Dhaka',
      to: 'Khulna',
      price: 900,
      quantity: 25,
      transportType: 'Bus',
      perks: ['AC', 'Water'],
      image:
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop',
    },
    {
      id: 202,
      title: 'Sylhet to Dhaka - Parabat Express',
      from: 'Sylhet',
      to: 'Dhaka',
      price: 450,
      quantity: 60,
      transportType: 'Train',
      perks: ['Prayer Room'],
      image:
        'https://images.unsplash.com/photo-1474487548417-781cb714c2f3?q=80&w=2069&auto=format&fit=crop',
    },
    {
      id: 203,
      title: 'Dhaka to Saidpur - Novoair',
      from: 'Dhaka',
      to: 'Saidpur',
      price: 3200,
      quantity: 10,
      transportType: 'Plane',
      perks: ['AC', 'Snacks'],
      image:
        'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?q=80&w=2074&auto=format&fit=crop',
    },
    {
      id: 204,
      title: 'Dhaka to Bhola - Karnaphuli 12',
      from: 'Dhaka',
      to: 'Bhola',
      price: 600,
      quantity: 40,
      transportType: 'Launch',
      perks: ['Deck', 'Canteen'],
      image:
        'https://images.unsplash.com/photo-1628867332694-845701a88b85?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: 205,
      title: 'Chittagong to Dhaka - Sonar Bangla',
      from: 'Chittagong',
      to: 'Dhaka',
      price: 950,
      quantity: 15,
      transportType: 'Train',
      perks: ['AC', 'Food'],
      image:
        'https://images.unsplash.com/photo-1535535112387-56ffe8db21ff?q=80&w=2074&auto=format&fit=crop',
    },
    {
      id: 206,
      title: 'Dhaka to Rajshahi - Desh Travels',
      from: 'Dhaka',
      to: 'Rajshahi',
      price: 1100,
      quantity: 8,
      transportType: 'Bus',
      perks: ['AC', 'Blanket', 'Water'],
      image:
        'https://images.unsplash.com/photo-1570125909232-eb2be79a1c74?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: 207,
      title: 'Dhaka to Jessore - US Bangla',
      from: 'Dhaka',
      to: 'Jessore',
      price: 2800,
      quantity: 5,
      transportType: 'Plane',
      perks: ['AC'],
      image:
        'https://images.unsplash.com/photo-1520437358207-323b43b50729?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: 208,
      title: 'Barisal to Dhaka - Parabat 12',
      from: 'Barisal',
      to: 'Dhaka',
      price: 1800,
      quantity: 2,
      transportType: 'Launch',
      perks: ['VIP Cabin', 'AC', 'TV'],
      image:
        'https://images.unsplash.com/photo-1605281317010-fe5ffe355ca5?q=80&w=2070&auto=format&fit=crop',
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section with 'View All' Link */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold mb-2">
              <FaClock />
              <span className="uppercase tracking-widest text-sm">
                Just Added
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-base-content">
              Latest Tickets
            </h2>
          </div>

          <Link to="/all-tickets" className="btn btn-outline btn-primary group">
            View All Tickets
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid Layout - Responsive (1 col mobile, 2 col tablet, 4 col desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestTickets.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestTickets;
