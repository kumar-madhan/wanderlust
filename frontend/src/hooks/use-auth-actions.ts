// src/hooks/use-auth-actions.ts

import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth-service';

export const useAuthActions = () => {
  const navigate = useNavigate();

  const signup = async (name: string, email: string, password: string) => {
    await authService.signup({ name, email, password });
    navigate('/signin');
  };

  const login = async (email: string, password: string) => {
    const { token } = await authService.login({ email, password });
    localStorage.setItem('token', token);
    navigate('/');
  };

  return { signup, login };
};
