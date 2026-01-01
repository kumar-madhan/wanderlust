import { Link, useNavigate } from 'react-router-dom';
import AddGoogleIcon from '@/assets/svg/google-color-icon.svg';
import { useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { TSignUpSchema, signUpSchema } from '@/lib/types';
import 'react-toastify/dist/ReactToastify.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { AxiosError, isAxiosError } from 'axios';
import axiosInstance from '@/helpers/axios-instance';
import userState from '@/utils/user-state';
import ThemeToggle from '@/components/theme-toggle-button';
import { useState, useEffect, useRef } from 'react';
import EyeIcon from '@/assets/svg/eye.svg';
import EyeOffIcon from '@/assets/svg/eye-off.svg';

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TSignUpSchema>({ resolver: zodResolver(signUpSchema) });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const toastShownRef = useRef(false);

  const onSubmit = async (data: FieldValues) => {
    try {
      const signupData = {
    name: data.fullName, // ✅ map fullName → name
    email: data.email,
    password: data.password,
  };

  const res = await toast.promise(
    axiosInstance.post('/auth/signup', signupData),
    {
      pending: 'Creating account ...',
      success: 'Account created successfully!',
      error: {
        render({ data }) {
          if (data instanceof AxiosError) {
            const msg = data?.response?.data?.message;
            if (msg?.includes('Email')) {
              setError('email', { type: 'manual', message: msg });
            } else {
              toast.error(msg || 'Signup failed');
            }
          }
          return 'Signup failed';
        },
      },
    }
  );

    // ✅ Redirect only after success
    if (res?.data?.email) {
        reset();
        navigate('/signin');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.response?.data?.message);
        toast.error(error.response?.data?.message || 'Signup failed');
      } else {
        console.error(error);
        toast.error('Unexpected error occurred');
      }
    }
  };

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const searchParams = new URLSearchParams(location.search);
      const isGoogleCallback = searchParams.get('google-callback') === 'true';

      if (isGoogleCallback && !toastShownRef.current) {
        try {
          const response = await axiosInstance.get('/api/auth/check');
          const { user } = response.data;
          if (user && user._id && user.role) {
            userState.setUser({ _id: user._id, role: user.role });
            navigate('/');
            if (!toastShownRef.current) {
              toast.success('Successfully logged in with Google');
              toastShownRef.current = true;
            }
          } else {
            console.error('User data is incomplete:', user);
          }
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
          console.error('Error handling Google login:', error);
          if (!toastShownRef.current) {
            toast.error('Failed to log in with Google');
            toastShownRef.current = true;
          }
        }
      }
    };

    handleGoogleCallback();
  }, [location, navigate]);

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_PATH}/api/auth/google`;
  };

  return (
    <div className="flex-grow cursor-default bg-white py-4 dark:bg-dark-card">
      <div className="m-4 mb-4 flex justify-center">
        <div className="flex w-full items-center justify-center">
          <h2 className="w-2/4 pl-2 text-center text-lg font-bold text-black dark:text-dark-primary sm:text-xl md:w-3/4 md:pl-48">
            Sign up to WanderLust
          </h2>
          <div className="flex items-center justify-end px-4 sm:px-20">
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div className="m-2 mt-8 flex flex-col items-center justify-center gap-2">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-3/4 lg:w-2/5">
          {/* Username */}
          <div className="mb-2">
            <input
              {...register('userName')}
              type="text"
              placeholder="Username"
              className="w-full rounded-lg bg-zinc-100 p-3 font-normal placeholder:text-sm dark:bg-dark-field dark:text-dark-textInField"
            />
            {errors.userName && <p className="p-3 text-xs text-red-500">{errors.userName.message}</p>}
          </div>

          {/* Full Name */}
          <div className="mb-2">
            <input
              {...register('fullName')}
              type="text"
              placeholder="Name"
              className="w-full rounded-lg bg-zinc-100 p-3 font-normal placeholder:text-sm dark:bg-dark-field dark:text-dark-textInField"
            />
            {errors.fullName && <p className="p-3 text-xs text-red-500">{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-2">
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              className="w-full rounded-lg bg-zinc-100 p-3 font-normal placeholder:text-sm dark:bg-dark-field dark:text-dark-textInField"
            />
            {errors.email && <p className="p-3 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="relative mb-2">
            <input
              {...register('password')}
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              className="w-full rounded-lg bg-zinc-100 p-3 font-normal placeholder:text-sm dark:bg-dark-field dark:text-dark-textInField"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
            >
              <img
                src={passwordVisible ? EyeOffIcon : EyeIcon}
                alt="Toggle Password Visibility"
                className="h-5 w-5"
              />
            </button>
            {errors.password && <p className="p-3 text-xs text-red-500">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="relative mb-4">
            <input
              {...register('confirmPassword')}
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Confirm Password"
              className="w-full rounded-lg bg-zinc-100 p-3 font-normal placeholder:text-sm dark:bg-dark-field dark:text-dark-textInField"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
            >
              <img
                src={passwordVisible ? EyeOffIcon : EyeIcon}
                alt="Toggle Confirm Password Visibility"
                className="h-5 w-5"
              />
            </button>
            {errors.confirmPassword && (
              <p className="p-3 text-xs text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="flex w-full items-center justify-center rounded-lg bg-neutral-800 p-3 text-base font-medium text-light disabled:bg-neutral-600 dark:bg-light dark:text-dark dark:hover:bg-dark-secondary/80 sm:text-lg sm:font-semibold"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-2 flex w-5/6 flex-col items-center justify-center gap-4 text-center text-sm font-normal dark:text-dark-primary sm:text-base">
          <p>
            Already have an account?
            <Link to={'/signin'} className="text-blue-600 hover:text-blue-500">
              {' '}
              Log in now
            </Link>
          </p>
        </div>

        <button
          className="flex w-full items-center justify-center space-x-2 rounded-lg border-2 border-b-4 border-gray-300 p-3 text-center hover:bg-gray-50 dark:border-gray-700 dark:text-dark-primary dark:hover:bg-gray-700 md:w-3/4 lg:w-2/5"
          onClick={handleGoogleLogin}
        >
          <img className="h-4 w-6 pl-1 sm:h-5 sm:w-10" src={AddGoogleIcon} />
          <span className="text-sm sm:text-base">Continue with Google</span>
        </button>
      </div>
    </div>
  );
}

export default Signup;
