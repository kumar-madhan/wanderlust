// src/hooks/use-auth-actions.ts

import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth-service';
import userState from '@/utils/user-state';

export const useAuthActions = () => {
  const navigate = useNavigate();

  const signup = async (name: string, email: string, password: string) => {
    await authService.signup({ name, email, password });
    navigate('/signin');
  };

  const login = async (email: string, password: string) => {
    const { token } = await authService.login({ email, password });

    // store token
    localStorage.setItem('token', token);

    // minimal auth state (role resolved later)
    userState.setUser({
      _id: email,        // backend uses email as JWT subject
      role: 'USER',      // safe default
    });

    navigate('/');
  };

  const logout = () => {
    userState.removeUser();
    navigate('/signin');
  };

  return { signup, login, logout };
};
