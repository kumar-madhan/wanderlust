import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signUp } from '../api';

interface SignUpForm {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>();

  const onSubmit = ({ confirmPassword, ...data }: SignUpForm) => {
    toast.promise(signUp(data), {
      pending: 'Creating account...',
      success: () => {
        navigate('/signin');
        return 'Account created successfully';
      },
      error: 'Signup failed',
    });
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-2xl border bg-[var(--card)] p-8 shadow-lg"
      >
        <h1 className="mb-2 text-2xl font-bold text-center">
          Create account
        </h1>
        <p className="mb-6 text-center text-sm opacity-70">
          Join WanderLust and start sharing stories
        </p>

        <div className="mb-4">
          <input
            {...register('name', { required: true })}
            placeholder="Full name"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              Name is required
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register('username', { required: true })}
            placeholder="Username"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <input
            {...register('email', { required: true })}
            placeholder="Email"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <input
            {...register('password', { required: true, minLength: 6 })}
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-6">
          <input
            {...register('confirmPassword', {
              validate: (v) =>
                v === watch('password') || 'Passwords do not match',
            })}
            type="password"
            placeholder="Confirm password"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-black py-3 text-white transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
        >
          Sign Up
        </button>

        <p className="mt-6 text-center text-sm opacity-70">
          Already have an account?{' '}
          <span
            className="cursor-pointer font-medium text-indigo-600 hover:underline"
            onClick={() => navigate('/signin')}
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
}
