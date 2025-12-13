import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  FaBus,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaExchangeAlt,
} from 'react-icons/fa';

const SearchForm = ({ redirectTo, type = [] }) => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [from, setFrom] = useState('');
  const [transfort, setTransfort] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [sort, setSort] = useState('Default');

  useEffect(() => {
    setFrom(searchParams.get('from') || '');
    setTo(searchParams.get('to') || '');
    setDate(searchParams.get('date') || '');
    setTransfort(searchParams.get('transport') || '');
    setSort(searchParams.get('sort') || 'Default');
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (from.trim()) params.append('from', from.toLowerCase());
    if (to.trim()) params.append('to', to.toLowerCase());
    if (date.trim()) params.append('date', date);
    if (transfort.trim()) params.append('transport', transfort);
    if (sort.trim()) params.append('sort', sort);

    if (redirectTo) {
      navigate(`/${redirectTo}?${params.toString()}`);
    } else {
      setSearchParams(Object.fromEntries(params.entries()));
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto -mt-10 relative z-20 md:px-4">
      <div className="bg-base-100 rounded-lg shadow-xl p-4 md:p-0 flex flex-col md:flex-row items-center border border-gray-200">
        <div className="flex-1 w-full p-4 border-b md:border-b-0 md:border-r border-gray-200 relative">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
            From
          </label>
          <div className="flex items-center gap-2">
            <FaBus className="text-xl text-primary" />
            <input
              type="text"
              placeholder="Source City"
              className="w-full bg-transparent focus:outline-none font-bold text-lg placeholder-gray-300 text-base-content"
              value={from}
              onChange={e => setFrom(e.target.value)}
            />
          </div>
        </div>

        <div className="hidden md:flex justify-center items-center w-8 -ml-4 z-10">
          <div className="bg-base-100 rounded-full p-1 border shadow-sm text-gray-400">
            <FaExchangeAlt />
          </div>
        </div>

        <div className="flex-1 w-full p-4 border-b md:border-b-0 md:border-r border-gray-200 pl-4 md:pl-6">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
            To
          </label>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-xl text-secondary" />
            <input
              type="text"
              placeholder="Destination City"
              className="w-full bg-transparent focus:outline-none font-bold text-lg placeholder-gray-300 text-base-content"
              value={to}
              onChange={e => setTo(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 w-full p-4 border-b md:border-b-0 md:border-r border-gray-200 pl-4 md:pl-6">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
            Category
          </label>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-xl text-secondary" />
            <select
              type="text"
              placeholder="Destination City"
              className="w-full bg-base-200 focus:outline-none font-bold text-lg placeholder-base-200 text-base-content"
              value={transfort}
              onChange={e => setTransfort(e.target.value)}
            >
              <option value="All">All</option>
              {type.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1 w-full p-4 flex gap-3.5 md:gap-0 items-center justify-between">
          <div className="flex-grow">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
              Date
            </label>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-xl text-accent" />
              <input
                type="date"
                className="bg-transparent focus:outline-none font-bold text-lg text-base-content w-full"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto p-2">
          <button
            onClick={handleSearch}
            className="btn btn-primary w-full md:w-40 h-full md:h-20 rounded-md md:rounded-l-none text-white text-lg font-bold shadow-none hover:brightness-110"
            style={{ backgroundColor: '#FF5722', borderColor: '#FF5722' }}
          >
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
