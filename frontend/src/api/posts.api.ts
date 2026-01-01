import apiClient from "./client";
import type { Post } from "../types/post-type";

export const getFeaturedPosts = async (page = 0, size = 5): Promise<Post[]> => {
  const { data } = await apiClient.get("/posts/featured", {
    params: { page, size },
  });
  return data;
};

export const getPostsByCategory = async (
  category: string,
  page = 0,
  size = 5
): Promise<Post[]> => {
  const { data } = await apiClient.get(`/posts/category/${category}`, {
    params: { page, size },
  });
  return data;
};

export const getPostById = async (id: string): Promise<Post> => {
  const { data } = await apiClient.get(`/posts/${id}`);
  return data;
};
