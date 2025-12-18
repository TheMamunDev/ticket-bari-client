import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '@/hooks/useAuth';
import SocialLogin from './SocialLogin';
import axios from 'axios';
import { handleFirebaseError } from '@/lib/utils/firebaseErrorHandle';
import useImage from '@/hooks/useImage';
import { useState, useTransition } from 'react';

import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import useTitle from '@/hooks/useTitle';

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
const MAX_FILE_SIZE = 5000000;
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter'),
  photoURL: z
    .any()
    .transform(fileList => fileList?.[0])
    .refine(file => file?.size <= MAX_FILE_SIZE, 'Max image size is 5MB.')
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
});

const Register = () => {
  useTitle('Register');
  const { signUp, updateUserProfile } = useAuth();
  const apiUrl = `${import.meta.env.VITE_BASE_URL}`;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [showPassword, setShowPassword] = useState(false);

  const [transition, startTransition] = useTransition();

  const onSubmit = async data => {
    startTransition(async () => {
      try {
        try {
          const photo = await useImage(data.photoURL);
          data.photoURL = photo;
        } catch (err) {
          console.log(err);
          toast.error(err.message);
          data.photoURL =
            'https://img.icons8.com/office/300/person-male-skin-type-4.png';
        }
        await signUp(data.email, data.password);
        await updateUserProfile(data.name, data.photoURL);
        const existingUser = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/${data.email}`
        );
        if (!existingUser.data || existingUser.data.length === 0) {
          const { password, ...safeData } = data;
          const result = await axios.post(`${apiUrl}/user`, {
            ...safeData,
            authType: 'credentials',
          });

          if (result.data.acknowledged) {
            toast.success('Account created');
            navigate(from, { replace: true });
          }
        } else {
          toast.error('User already registered');
        }
      } catch (err) {
        handleFirebaseError(err);
        return;
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-4xl bg-base-100 rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden my-4">
        <div className="hidden md:flex flex-col justify-center bg-primary text-white p-10">
          <h1 className="text-4xl font-extrabold mb-4">Create Your Account</h1>
          <p className="opacity-90 text-lg">
            Join our platform to book tickets, manage trips, and access trusted
            vendors across Bus, Train, Launch & Plane.
          </p>

          <div className="mt-8 space-y-3 text-sm opacity-90">
            <p>✔ Fast & secure registration</p>
            <p>✔ Easy booking management</p>
          </div>
        </div>
        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold mb-2 text-base-content">
            Register
          </h2>
          <p className="text-sm text-base-content/60 mb-6">
            Create an account to get started
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label font-semibold">Full Name</label>
              <input
                type="text"
                {...register('name')}
                placeholder="Your full name"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <span className="text-error text-xs mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                {...register('email')}
                placeholder="you@example.com"
                className="input input-bordered w-full"
              />
              {errors.email && (
                <span className="text-error text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="form-control relative">
              <label className="label font-semibold">Password</label>
              <label className="input validator border border-gray-200 w-full">
                <FaLock size={18} className="text-gray-500 " />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  required
                  className="input-field input-bordered"
                  placeholder="Create a strong password"
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

              {errors.password && (
                <span className="text-error text-xs mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label font-semibold">Profile Photo</label>
              <input
                {...register('photoURL')}
                className="file-input file-input-bordered w-full"
                type="file"
                accept="image/*"
              />
              {errors.photoURL && (
                <span className="text-error text-xs mt-1">
                  {errors.photoURL.message}
                </span>
              )}
            </div>
            <button
              disabled={transition}
              className="btn btn-primary w-full text-white gap-2 disabled:bg-primary disabled:opacity-70"
              type="submit"
            >
              {transition ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          <div className="mt-6">
            <SocialLogin />
          </div>

          <p className="mt-6 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="link link-primary font-semibold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Register;
