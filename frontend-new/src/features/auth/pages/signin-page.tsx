import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signIn } from '../api';
import userState from '@/utils/user-state';

interface SignInForm {
  email: string;
  password: string;
}

export default function SignIn() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();

  const onSubmit = (data: SignInForm) => {
    toast.promise(
      signIn(data).then((res) => {
        userState.setUser(res.data.data);
        navigate('/');
        return res;
      }),
      {
        pending: 'Signing in...',
        success: 'Signed in successfully',
        error: 'Invalid credentials',
      }
    );
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-2xl border bg-[var(--card)] p-8 shadow-lg"
      >
        <h1 className="mb-2 text-2xl font-bold text-center">
          Welcome back
        </h1>
        <p className="mb-6 text-center text-sm opacity-70">
          Sign in to continue to WanderLust
        </p>

        <div className="mb-4">
          <input
            {...register('email', { required: true })}
            placeholder="Email"
            className="w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-indigo-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              Email is required
            </p>
          )}
        </div>

        <div className="mb-6">
          <input
            {...register('password', { required: true })}
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-indigo-500"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              Password is required
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-black py-3 text-white transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
        >
          Sign In
        </button>

        <p className="mt-6 text-center text-sm opacity-70">
          Don’t have an account?{' '}
          <span
            className="cursor-pointer font-medium text-indigo-600 hover:underline"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
