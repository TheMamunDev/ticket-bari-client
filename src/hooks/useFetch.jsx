import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

import axios from 'axios';

const useFetch = (key, url, secure = false, params = {}) => {
  const publicApi = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
  });
  const secureApi = useAxios();
  const api = secure ? secureApi : publicApi;
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const res = await api.get(url, { params });
      return res.data;
    },
    enabled: !!url,
  });
};

export default useFetch;
