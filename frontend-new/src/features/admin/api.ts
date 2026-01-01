import axiosInstance from '../../services/axios-instance';

export const getAllUsers = () =>
  axiosInstance.get('/api/admin/users');

export const getAllBlogs = () =>
  axiosInstance.get('/api/admin/blogs');
