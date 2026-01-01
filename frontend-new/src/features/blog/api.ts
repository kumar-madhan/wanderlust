import axiosInstance from '../../services/axios-instance';

export const getFeaturedPosts = () =>
  axiosInstance.get('/posts/featured');

export const getLatestPosts = () =>
  axiosInstance.get('/posts/latest');

export const getPostsByCategory = (category: string) =>
  axiosInstance.get(`/posts/categories/${category}`);
