// src/pages/signin-page.tsx

import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';

import ThemeToggle from '@/components/theme-toggle-button';
import axiosInstance from '@/helpers/axios-instance';
import userState from '@/utils/user-state';
import EyeIcon from '@/assets/svg/eye.svg';
import EyeOffIcon from '@/assets/svg/eye-off.svg';

type SignInForm = {
  email: string;
  password: string;
};

function Signin() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>();

  const onSubmit = async (data: SignInForm) => {
    try {
      const res = await axiosInstance.post('/auth/login', {
        email: data.email,      // ✅ GUARANTEED email
        password: data.password,
      });

      const token = res.data?.token;
      if (!token) throw new Error('Invalid server response');

      localStorage.setItem('token', token);
      userState.setUser({ _id: data.email, role: 'USER' });

      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      const msg = isAxiosError(error)
        ? error.response?.data?.message || 'Invalid email or password'
        : 'Login failed';

      toast.error(msg);
    }
  };

  return (
    <div className="flex-grow bg-white py-6 dark:bg-dark-card">
      <div className="flex justify-between px-6">
        <h2 className="text-lg font-bold dark:text-dark-primary">
          Sign in to WanderLust
        </h2>
        <ThemeToggle />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-8 w-full max-w-md space-y-4 px-6"
      >
        <input
          {...register('email', { required: 'Email is required' })}
          type="email"
          placeholder="Email"
          className="
            w-full rounded-lg p-3 text-sm
            bg-zinc-100 text-black placeholder:text-zinc-500
            dark:bg-dark-field dark:text-white dark:placeholder:text-gray-400
          "
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}

        <div className="relative">
          <input
            {...register('password', { required: 'Password is required' })}
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            className="
              w-full rounded-lg p-3 text-sm
              bg-zinc-100 text-black placeholder:text-zinc-500
              dark:bg-dark-field dark:text-white dark:placeholder:text-gray-400
            "
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
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-neutral-800 p-3 text-white disabled:opacity-60"
        >
          {isSubmitting ? 'Signing in…' : 'Log In'}
        </button>

        <p className="text-sm dark:text-dark-primary">
          Don’t have an account?
          <Link to="/signup" className="ml-1 text-blue-600">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signin;
