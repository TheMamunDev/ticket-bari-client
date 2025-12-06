import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import SocialLogin from './SocialLogin';

export default function Login() {
  const { handleGoogleLogin, user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    console.log(data);
    try {
      await login(data?.email, data?.pass).then(() => {
        toast.success('Logged in');
        navigate(from, { replace: true });
      });
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          required
          {...register('email')}
          placeholder="Email"
          className="input w-full"
        />
        <input
          required
          type="password"
          {...register('pass')}
          placeholder="Password"
          className="input w-full"
        />
        <button className="btn btn-primary w-full" type="submit">
          Login
        </button>
      </form>
      <SocialLogin></SocialLogin>

      <p className="mt-4">
        <Link to="/forgot" className="link">
          Forgot password?
        </Link>
      </p>
      <p className="mt-2">
        Don't have an account?{' '}
        <Link to="/register" className="link">
          Register
        </Link>
      </p>
    </div>
  );
}
