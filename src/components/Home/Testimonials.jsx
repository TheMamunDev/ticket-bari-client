import useAuth from '@/hooks/useAuth';
import useFetch from '@/hooks/useFetch';
import React, { useState } from 'react';
import { Link } from 'react-router';
import ReviewSkeleton from '../Shared/Loader/ReviewSkeleton';

const Testimonials = () => {
  const { user, loading } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);

  const {
    data: reviews,
    isLoading,
    error,
    isError,
    refetch,
  } = useFetch(['testimonials'], `/reviews`);
  if (isLoading || loading) return <ReviewSkeleton></ReviewSkeleton>;

  const nextSlide = () => {
    setActiveIndex(prev => (prev + 1) % reviews.length);
  };
  const prevSlide = () => {
    setActiveIndex(prev => (prev - 1 + reviews.length) % reviews.length);
  };
  const getIndex = offset => {
    return (activeIndex + offset + reviews.length) % reviews.length;
  };
  const activeReview = reviews[activeIndex];
  if (!reviews.length || reviews.length === 0)
    return (
      <section className="bg-base-200 mt-4 py-24 px-4 min-h-[700px] flex flex-col justify-center items-center font-sans">
        <div className="w-full max-w-md bg-base-200 rounded-3xl shadow-2xl p-10 text-center border-b-8 border-primary relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full animate-pulse" />

          <div className="flex justify-center mb-6">
            <div className="relative animate-bounce">
              <div className="bg-primary/10 p-6 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>

              <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-400 rounded-full animate-ping" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-content-base mb-2">
            No Stories Yet
          </h2>
          <p className="text-gray-500 mb-8 italic">
            "Every great journey starts with a single step. Be the first to tell
            us about yours!"
          </p>

          <Link
            to="/dashboard/user/booked-tickets"
            className="btn btn-primary btn-wide rounded-xl shadow-lg hover:shadow-primary/30 transition-all"
          >
            Write a Review
          </Link>
        </div>

        <div className="text-center mt-12 opacity-50">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-400">
            Waiting for your next adventure
          </p>
        </div>
      </section>
    );

  return (
    <section className="bg-base-200 mt-4 py-24 px-4 overflow-hidden min-h-[700px] flex flex-col justify-center items-center font-sans">
      <div className="relative w-full max-w-4xl h-[350px] flex items-center justify-center mb-8">
        <div
          onClick={prevSlide}
          className="hidden md:flex absolute cursor-pointer transition-all duration-500 ease-in-out transform -translate-x-[15%] md:-translate-x-[40%] lg:-translate-x-[75%] xl:-translate-x-[95%] -rotate-6 scale-90 hover:scale-95 z-10 w-[300px] md:w-[400px] h-[240px] md:h-[280px] rounded-2xl p-6 shadow-2xl bg-[#8b5cf6] text-white opacity-90  flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
              PREV REVIEW
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1 opacity-80">
              What they said...
            </h3>
            <p className="text-sm opacity-90 line-clamp-3 italic">
              "{reviews[getIndex(-1)].text}"
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="avatar placeholder">
              <div className="bg-white/30 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-xs font-bold">
                  {reviews[getIndex(-1)].userName.charAt(0)}
                </span>
              </div>
            </div>
            <p className="text-xs font-semibold">
              {reviews[getIndex(-1)].userName}
            </p>
          </div>
        </div>

        <div
          onClick={nextSlide}
          className="hidden md:flex absolute cursor-pointer transition-all duration-500 ease-in-out transform translate-x-[15%] md:translate-x-[40%] lg:translate-x-[75%] xl:translate-x-[95%] rotate-6 scale-90 hover:scale-95 z-10 w-[300px] md:w-[400px] h-[240px] md:h-[280px] rounded-2xl p-6 shadow-2xl bg-[#f97316] text-white opacity-90  flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
              NEXT REVIEW
            </span>
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
          <div className="text-right">
            <h3 className="text-xl font-bold mb-1 opacity-80">Coming up...</h3>
            <p className="text-sm opacity-90 line-clamp-3 italic">
              "{reviews[getIndex(1)].text}"
            </p>
          </div>
          <div className="flex items-center justify-end gap-2 mt-2">
            <p className="text-xs font-semibold">
              {reviews[getIndex(1)].userName}
            </p>
            <div className="avatar placeholder">
              <div className="bg-white/30 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-xs font-bold">
                  {reviews[getIndex(1)].userName.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute transition-all duration-500 ease-in-out transform z-30 w-[320px] md:w-[450px] h-[370px]  bg-white rounded-2xl shadow-2xl p-8 flex flex-col justify-between border-t-8 border-primary">
          <button
            onClick={prevSlide}
            className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-40 bg-white shadow-lg rounded-full p-2 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-40 bg-white shadow-lg rounded-full p-2 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-lg md:text-2xl font-bold text-gray-900">
                Experience Score
              </h2>
            </div>
            <div className="md:badge md:badge-primary md:badge-outline font-bold md:p-3 text-sm md:text-xl">
              VERIFIED TRIP
            </div>
          </div>
          <div className="flex items-center gap-2 text-primary mt-1 mb-2">
            <span className="font-black md:text-2xl text-lg">
              {activeReview.tripName.slice(0, 25)}{' '}
              {activeReview.tripName.length > 15 ? '...' : ''}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-gray-50 p-2 flex items-center justify-center rounded-xl text-center border border-gray-100 shadow-sm">
              <div className="text-primary font-bold">
                {activeReview.experience.slice(0, 5)}
              </div>
            </div>

            <div className="bg-gray-50 flex items-center justify-center p-2 rounded-xl text-center border border-gray-100 shadow-sm">
              <div className="text-primary font-bold">
                {activeReview.rating} / 5
              </div>
            </div>

            <Link
              to={`/ticket/${activeReview.ticketId}`}
              className="bg-gray-50 p-2 rounded-xl flex flex-col justify-center items-center border border-gray-100 shadow-sm cursor-pointer hover:bg-gray-100 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-[9px] font-bold text-gray-800 uppercase">
                View Ticket
              </span>
            </Link>
          </div>

          <div>
            <p className="text-gray-600 text-sm md:text-[15px] italic mb-4 leading-relaxed line-clamp-3">
              "{activeReview.text}"
            </p>
            <div className="flex items-center gap-3 border-t pt-3 border-gray-100">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-10 h-10">
                  <span className="text-sm font-bold">
                    {activeReview?.userImage}
                  </span>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">
                  {activeReview.userName}
                </h4>
                <span className="text-xs text-primary font-bold uppercase tracking-wide">
                  {activeReview.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 max-w-2xl mx-auto z-40 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-base-content mb-3">
          Not just a Ticket. A Journey.
        </h2>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          If you're a commuter, explorer, or student looking for a journey that
          actually works — without the chaos of counters — this platform was
          built for you.
        </p>
      </div>
    </section>
  );
};

export default Testimonials;
