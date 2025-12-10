import axios from 'axios';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import useAuth from './useAuth';

const apiUrl = import.meta.env.VITE_BASE_URL;

const axiosSecure = axios.create({
  baseURL: apiUrl,
});

const useAxios = () => {
  const navigate = useNavigate();
  const { logOut, user } = useAuth();
  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async config => {
        if (user) {
          const token = await user.accessToken;
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      }
    );
    const responseIntercepter = axiosSecure.interceptors.response.use(
      res => {
        return res;
      },
      err => {
        const status = err.status;
        if (status === 401 || status === 403) {
          console.log('Bad request');
          logOut().then(() => {
            navigate('/login');
          });
        }
        return Promise.reject(err);
      }
    );
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseIntercepter);
    };
  }, [user, logOut, navigate]);
  return axiosSecure;
};

export default useAxios;
