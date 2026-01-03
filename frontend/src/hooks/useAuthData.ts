// src/hooks/useAuthData.ts

import { AuthData } from '@/lib/types';
import userState from '@/utils/user-state';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useAuthData = (): AuthData => {
  const location = useLocation();
  const user = userState.getUser();

  const [data, setData] = useState<AuthData>({
    _id: user?._id || '',
    role: user?.role || '',
    token: localStorage.getItem('token') || '',
    loading: true,
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      loading: false,
    }));
  }, [location, user?._id]);

  return data;
};

export default useAuthData;
