// src/services/posts.service.ts

import axiosInstance from "@/helpers/axios-instance";

export const getAllPosts = async () => {
  const response = await axiosInstance.get("/posts");
  return response.data;
};

export const getFeaturedPosts = async () => {
  const response = await axiosInstance.get("/posts/featured");
  return response.data;
};

export const getPostsByCategory = async (category: string) => {
  const response = await axiosInstance.get(
    `/posts/category/${encodeURIComponent(category)}`
  );
  return response.data;
};

export const getPostsByAuthor = async (authorName: string) => {
  const response = await axiosInstance.get(
    `/posts/author/${encodeURIComponent(authorName)}`
  );
  return response.data;
};

export const getPostById = async (id: string) => {
  const response = await axiosInstance.get(`/posts/${id}`);
  return response.data;
};
