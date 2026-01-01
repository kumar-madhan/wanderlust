import axiosInstance from '@/services/axios-instance';

export const signIn = (data: {
  email: string;
  password: string;
}) =>
  axiosInstance.post('/auth/email-password/signin', data);

export const signUp = (data: {
  name: string;
  username: string;
  email: string;
  password: string;
}) =>
  axiosInstance.post('/auth/email-password/signup', data);
