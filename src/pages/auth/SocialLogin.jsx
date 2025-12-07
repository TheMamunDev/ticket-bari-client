import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SocialLogin = () => {
  const { handleGoogleLogin } = useAuth();
  const navigate = useNavigate();
  const apiUrl = `${import.meta.env.VITE_BASE_URL}`;
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleGoogleSignIn = async () => {
    try {
      const userLogged = await handleGoogleLogin();
      const formData = {
        name: userLogged.user.displayName,
        email: userLogged.user.email,
        photo: userLogged.user.photoURL,
        authType: 'google',
      };
      if (userLogged.user) {
        const existingUser = await axios.get(
          `${apiUrl}/user/${formData.email}`
        );
        if (!existingUser.data) {
          const result = await axios.post(`${apiUrl}/user`, formData);
          if (result.data.acknowledged) {
            console.log('data', result);
            navigate(from, { replace: true });
          }
        }
        toast.success('Welcome back!');
        navigate(from, { replace: true });
      }
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
