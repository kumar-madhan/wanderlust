import apiClient from './client';
import type { Post } from '../types/post-type';

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements?: number;
  totalPages?: number;
}

export const getPosts = async (
  page = 0,
  size = 5
): Promise<Post[]> => {
  const { data } = await apiClient.get('/api/posts', {
    params: { page, size },
  });
  return data;
};

export const getFeaturedPosts = async (
  page = 0,
  size = 5
): Promise<Post[]> => {
  const { data } = await apiClient.get('/api/posts/featured', {
    params: { page, size },
  });
  return data;
};

export const getPostsByCategory = async (
  category: string,
  page = 0,
  size = 5
): Promise<Post[]> => {
  const { data } = await apiClient.get(
    `/api/posts/category/${category}`,
    { params: { page, size } }
  );
  return data;
};

export const getPostById = async (postId: string): Promise<Post> => {
  const { data } = await apiClient.get(`/api/posts/${postId}`);
  return data;
};
