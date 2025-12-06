import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '@/hooks/useAuth';
import SocialLogin from './SocialLogin';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email(),
  password: z.string().min(6, 'Password Min Length is 6 Character'),
  photoURL: z.string().url(),
});

const Register = () => {
  const { signUp, updateUserProfile } = useAuth();
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

  const onSubmit = async data => {
    console.log(data);
    try {
      await signUp(data.email, data.password).then(res => {
        updateUserProfile().then(res => {
          toast.success('Account created');
          navigate(from, { replace: true });
        });
      });
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Registration failed');
    }
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
        <input
          type="password"
          {...register('password')}
          placeholder="Password"
          className="input w-full"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        <input
          type="url"
          {...register('photoURL')}
          placeholder="Photo URL"
          className="input w-full"
        />
        {errors.photoURL && (
          <p className="text-red-500 text-sm">{errors.photoURL.message}</p>
        )}
        <button className="btn btn-primary w-full" type="submit">
          Create account
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
