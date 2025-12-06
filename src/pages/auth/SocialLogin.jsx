import useAuth from '@/hooks/useAuth';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SocialLogin = () => {
  const { handleGoogleLogin } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await handleGoogleLogin();
      toast.success('Logged in with Google');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Google login failed');
    }
  };

  return (
    <div className="w-full">
      <div className="divider">OR</div>
      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="btn btn-outline btn-secondary w-full flex items-center gap-2"
      >
        <FaGoogle className="text-lg" />
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
