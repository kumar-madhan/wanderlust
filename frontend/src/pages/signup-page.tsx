// src/pages/signup-page.tsx

import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';

import AddGoogleIcon from '@/assets/svg/google-color-icon.svg';
import EyeIcon from '@/assets/svg/eye.svg';
import EyeOffIcon from '@/assets/svg/eye-off.svg';

import { TSignUpSchema, signUpSchema } from '@/lib/types';
import axiosInstance from '@/helpers/axios-instance';
import ThemeToggle from '@/components/theme-toggle-button';

function Signup() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: TSignUpSchema) => {
    try {
      await axiosInstance.post('/auth/signup', {
        name: data.fullName,
        email: data.email,
        password: data.password,
      });

      toast.success('Account created successfully');
      reset();
      navigate('/signin');
    } catch (error) {
      if (!isAxiosError(error)) {
        toast.error('Unexpected error occurred');
        return;
      }

      const backendMessage =
        error.response?.data?.message || 'Signup failed';

      const lowerMsg = backendMessage.toLowerCase();

      // ✅ inline validation for duplicate email
      if (lowerMsg.includes('email') && lowerMsg.includes('exist')) {
        setError('email', {
          type: 'manual',
          message: backendMessage,
        });
        return;
      }

      // ✅ fallback: show backend message exactly
      toast.error(backendMessage);
    }
  };

  return (
    <div className="flex-grow bg-white py-4 dark:bg-dark-card">
      <div className="m-4 flex justify-between px-4 md:px-20">
        <h2 className="text-lg font-bold dark:text-dark-primary">
          Sign up to WanderLust
        </h2>
        <ThemeToggle />
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full px-4 md:w-3/4 lg:w-2/5"
        >
          <input
            {...register('userName')}
            placeholder="Username"
            className="mb-2 w-full rounded-lg bg-zinc-100 p-3 dark:bg-dark-field"
          />
          {errors.userName && (
            <p className="text-xs text-red-500">
              {errors.userName.message}
            </p>
          )}

          <input
            {...register('fullName')}
            placeholder="Name"
            className="mb-2 w-full rounded-lg bg-zinc-100 p-3 dark:bg-dark-field"
          />
          {errors.fullName && (
            <p className="text-xs text-red-500">
              {errors.fullName.message}
            </p>
          )}

          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className="mb-2 w-full rounded-lg bg-zinc-100 p-3 dark:bg-dark-field"
          />
          {errors.email && (
            <p className="text-xs text-red-500">
              {errors.email.message}
            </p>
          )}

          <div className="relative mb-2">
            <input
              {...register('password')}
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              className="w-full rounded-lg bg-zinc-100 p-3 dark:bg-dark-field"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-3"
            >
              <img
                src={passwordVisible ? EyeOffIcon : EyeIcon}
                className="h-5 w-5"
              />
            </button>
            {errors.password && (
              <p className="text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <input
              {...register('confirmPassword')}
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Confirm Password"
              className="w-full rounded-lg bg-zinc-100 p-3 dark:bg-dark-field"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-neutral-800 p-3 text-white disabled:opacity-60 dark:bg-light dark:text-dark"
          >
            {isSubmitting ? 'Creating account…' : 'Sign Up'}
          </button>
        </form>

        <p className="text-sm dark:text-dark-primary">
          Already have an account?
          <Link to="/signin" className="ml-1 text-blue-600">
            Log in
          </Link>
        </p>

        <button
          className="flex w-full items-center justify-center gap-2 rounded-lg border p-3 md:w-3/4 lg:w-2/5"
          onClick={() =>
            (window.location.href =
              `${import.meta.env.VITE_API_PATH}/api/auth/google`)
          }
        >
          <img src={AddGoogleIcon} className="h-5 w-5" />
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default Signup;
