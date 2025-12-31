import apiClient from './client';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export const getCurrentUser = async (): Promise<User> => {
  const { data } = await apiClient.get('/api/users/me');
  return data;
};

export const getAllUsers = async (): Promise<User[]> => {
  const { data } = await apiClient.get('/api/users/all');
  return data;
};
