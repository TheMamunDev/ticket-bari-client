import { useEffect, useState, useTransition } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import SocialLogin from './SocialLogin';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import useTitle from '@/hooks/useTitle';

export default function Login() {
  useTitle('Login');
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [showPassword, setShowPassword] = useState(false);
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

  const [transition, startTransition] = useTransition();

  const onSubmit = async data => {
    startTransition(async () => {
      try {
        await login(data?.email, data?.pass).then(() => {
          toast.success('Logged in');
          navigate(from, { replace: true });
        });
      } catch (err) {
        toast.error(err.message || 'Login failed');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-4xl bg-base-100 rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="hidden md:flex flex-col justify-center bg-primary text-white p-10">
          <h1 className="text-4xl font-extrabold mb-4">Welcome Back 👋</h1>
          <p className="opacity-90 text-lg">
            Login to manage your bookings, track trips, and explore tickets
            across Bus, Train, Launch & Plane.
          </p>

          <div className="mt-8 space-y-3 text-sm opacity-90">
            <p>✔ Secure ticket booking</p>
            <p>✔ Multiple transport options</p>
            <p>✔ Trusted vendors & easy payments</p>
          </div>
        </div>
        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold mb-2 text-base-content">
            Login to Your Account
          </h2>
          <p className="text-sm text-base-content/60 mb-6">
            Enter your credentials to continue
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label font-semibold">Email</label>
              <input
                required
                type="email"
                {...register('email')}
                placeholder="you@example.com"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control relative">
              <label className="label font-semibold">Password</label>
              <label className="input validator border border-gray-200 w-full">
                <FaLock size={18} className="text-gray-500 " />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('pass')}
                  required
                  className="input-field input-bordered"
                  placeholder="••••••••"
                />
                <button
                  className="text-base-600"
                  onClick={e => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </label>
            </div>

            <div className="flex justify-between items-center text-sm">
              <Link to="/forgot" className="link link-hover link-primary">
                Forgot password?
              </Link>
            </div>

            <button
              disabled={transition}
              className="btn btn-primary w-full text-white gap-2 disabled:bg-primary disabled:opacity-70"
              type="submit"
            >
              {transition ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
          <div className="mt-6">
            <SocialLogin />
          </div>
          <p className="mt-6 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="link link-primary font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
