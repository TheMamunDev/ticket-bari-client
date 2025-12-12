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
import { use, useState, useTransition } from 'react';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
    <div className="max-w-md mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          {...register('name')}
          placeholder="Name"
          className="input w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
        <input
          {...register('email')}
          placeholder="Email"
          className="input w-full"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            placeholder="Password"
            className="input w-full pr-12"
          />

          <span
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        <label className="label">Photo </label>
        <input
          {...register('photoURL')}
          className="file-input w-full"
          name="photoURL"
          type="file"
          accept="image/*"
        />
        {errors.photoURL && (
          <p className="text-red-400">{errors.photoURL.message}</p>
        )}
        <div></div>
        <button
          disabled={transition}
          className="btn btn-primary w-full disabled:bg-primary disabled:text-white"
          type="submit"
        >
          {transition ? (
            <>
              <Spinner />
              Creating Account....
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>
      <SocialLogin></SocialLogin>
      <p className="mt-2">
        Already have an account?{' '}
        <Link to="/login" className="link">
          Login here
        </Link>
      </p>
    </div>
  );
};
export default Register;
