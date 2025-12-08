import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from './useAxios';
import useAuth from './useAuth';

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const { isLoading: roleLoading, data: role = 'user' } = useQuery({
    queryKey: ['user-role', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}/role`);

      return res.data?.role || 'user';
    },
  });

  return { role, roleLoading };
};

export default useRole;
