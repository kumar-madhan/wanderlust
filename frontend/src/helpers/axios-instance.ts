// src/helpers/axios-instance.ts

import axios from 'axios';
import userState from '@/utils/user-state';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PATH + '/api',
  withCredentials: false,
});

/* =====================
   REQUEST INTERCEPTOR
   ===================== */
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const url = config.url ?? '';

  const isAuthApi = url.startsWith('/auth/');

  // ❗ DO NOT attach token for auth endpoints
  if (!isAuthApi && token && token.split('.').length === 3) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

/* =====================
   RESPONSE INTERCEPTOR
   ===================== */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const url = error?.config?.url ?? '';
    const pathname = window.location.pathname;

    const isAuthApi =
      url.startsWith('/auth/') ||
      url.startsWith('/users/me');

    const isAuthPage =
      pathname.startsWith('/signin') ||
      pathname.startsWith('/signup');

    if (
      (status === 401 || status === 403) &&
      !isAuthApi &&
      !isAuthPage
    ) {
      userState.removeUser();
      window.location.href = '/signin';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
