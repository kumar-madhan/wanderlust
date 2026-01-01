import { useEffect, useState } from 'react';
import userState from '@/utils/user-state';

export function useAuth() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(userState.getUser());
  }, []);

  return {
    user,
    isAuthenticated: !!user,
  };
}
