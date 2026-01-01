import axios from 'axios';
import userState from '@/utils/user-state';

const axiosInstance = axios.create({
  baseURL: '/api', // ✅ REQUIRED
  withCredentials: true,
});

axiosInstance.interceptors.request.use(config => {
  const user = userState.getUser();
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default axiosInstance;
