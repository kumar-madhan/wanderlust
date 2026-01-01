import { useEffect, useState } from 'react';
import axiosInstance from '@/services/axios-instance';
import userState from '@/utils/user-state';

export default function useAuthData() {
  const user = userState.getUser();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      return;
    }

    axiosInstance
      .get(`/api/auth/check/${user._id}`)
      .then(res => setToken(res.data?.data))
      .finally(() => setLoading(false));
  }, [user?._id]);

  return {
    user,
    role: user?.role,
    token,
    loading,
  };
}
