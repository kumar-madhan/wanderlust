// src/services/auth-service.ts

import axiosInstance from '../helpers/axios-instance';

interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const authService = {
  signup: async (userData: SignupPayload) => {
    const { data } = await axiosInstance.post('/auth/signup', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
    return data;
  },

  login: async (credentials: LoginPayload) => {
    const { data } = await axiosInstance.post('/auth/login', credentials);
    return data; // { token }
  },
};
