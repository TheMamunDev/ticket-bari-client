import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import useAxios from '@/hooks/useAxios';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  const axiosSecure = useAxios();

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('processing');

  const verifyPayment = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.patch(`/pay?session_id=${sessionId}`);
      return res.data;
    },

    onSuccess: data => {
      console.log(data);
      setStatus('success');
      setTimeout(() => {
        navigate('/dashboard/user/payment-history');
      }, 3000);
      setLoading(false);
    },

    onError: () => {
      navigate('/payment-failed');
    },
  });

  useEffect(() => {
    if (!sessionId) {
      navigate('/');
      return;
    }
    verifyPayment.mutate();
  }, [sessionId, navigate]);

  if (loading)
    return (
      <div className="text-center mt-20">
        Verifying payment... Don't close the page
      </div>
    );

  if (status === 'failed') {
    return (
      <div className="text-center mt-20 text-red-500">
        <h2>Payment verification failed.</h2>
        <p>Please contact support.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <p className="text-gray-500">Redirecting to your order history...</p>

      <button
        onClick={() => navigate('/dashboard/my-percels')}
        className="btn btn-primary"
      >
        Go to My Percels
      </button>
    </div>
  );
};

export default PaymentSuccess;
