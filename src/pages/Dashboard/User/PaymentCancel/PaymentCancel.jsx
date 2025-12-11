import { Link } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4">
      <div className="bg-base-100 shadow-xl border border-base-300 p-8 rounded-2xl max-w-md w-full text-center">
        <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4 animate-pulse" />

        <h1 className="text-3xl font-bold text-red-500 mb-2">
          Payment Canceled
        </h1>

        <p className="text-base-content/70 mb-6">
          Your payment was not completed. If this was a mistake, you can try
          again anytime.
        </p>
        <div className="flex flex-col gap-3">
          <Link to="/" className="btn btn-primary w-full">
            Go to Home
          </Link>

          <Link
            to="/dashboard/user/booked-tickets"
            className="btn btn-outline w-full"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
