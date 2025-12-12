import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { FaBus, FaHome, FaExclamationTriangle } from 'react-icons/fa';

const ErrorPage = () => {
  const error = useRouteError();
  // console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
      <div className="relative mb-8">
        <div className="text-9xl font-black text-base-300 select-none">404</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-primary animate-bounce">
          <FaBus />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-base-content mb-2">
        Oops! Destination Not Found
      </h1>
      <p className="text-lg text-base-content/60 max-w-md mb-8">
        It seems like the page you are looking for has taken a detour or doesn't
        exist. Let's get you back on track.
      </p>

      <div className="flex gap-4">
        <Link to="/" className="btn btn-primary text-white gap-2 px-6">
          <FaHome /> Go to Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="btn btn-outline gap-2"
        >
          Go Back
        </button>
      </div>

      <div className="mt-12 text-sm text-base-content/40">
        Error Code: 404 | Route Not Found
      </div>
    </div>
  );
};

export default ErrorPage;
