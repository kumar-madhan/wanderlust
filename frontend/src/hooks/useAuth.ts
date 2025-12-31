import { useEffect, useState } from 'react';
import { getCurrentUser } from '../api/users.api';

interface AuthState {
  user: any | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export default function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setState({ user: null, loading: false, isAuthenticated: false });
      return;
    }

    getCurrentUser()
      .then((user) => {
        setState({ user, loading: false, isAuthenticated: true });
      })
      .catch(() => {
        localStorage.removeItem('token');
        setState({ user: null, loading: false, isAuthenticated: false });
      });
  }, []);

  return state;
}
