import apiClient from './client';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const { data } = await apiClient.post('/api/auth/login', payload);
  return data;
};

export const signup = async (payload: Record<string, unknown>) => {
  const { data } = await apiClient.post('/api/auth/signup', payload);
  return data;
};
