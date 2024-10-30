import axios from 'axios';
import { refreshTokenRequest } from '../modules/Swiftsync.class';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

const handleTokenRefresh = async (error, onNavigate) => {
  const originalRequest = error.config;

  if (error.response?.data?.code === 'token_not_valid') {
    const refreshToken = localStorage.getItem('refresh');

    if (!refreshToken) {
      onNavigate('/signin');
      return Promise.reject(error);
    }

    try {
      const response = await refreshTokenRequest({ refresh: refreshToken });

      const newAccessToken = response?.access;

      // Update the access token in local storage
      localStorage.setItem('access', newAccessToken);

      // Update the Authorization header and retry the original request
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axios(originalRequest);
    } catch (refreshError) {
      onNavigate('/signin');
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(
  (config) => {
    // const authToken = localStorage.getItem('access');
    const authToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyNzk5MzMxLCJpYXQiOjE3MzAyMDczMzEsImp0aSI6IjZhNjdhZDM2ZDQzNTQyMTJhMGQ4ZmIxNjRlN2E3NDk0IiwidXNlcl9pZCI6NTB9.GUQWN88NuODzZFnd1qh9a3LotVLjhcNYB3WYNXAnccA';
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => handleTokenRefresh(error)
);

export default axiosInstance;
