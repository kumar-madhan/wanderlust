import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_PATH;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PATH,
  withCredentials: true,
});

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;