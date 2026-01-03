// src/services/user-service.ts

import axiosInstance from '../helpers/axios-instance';

export const userService = {
  getCurrentUser: async () => {
    const { data } = await axiosInstance.get('/users/me');
    return data;
  },
};
