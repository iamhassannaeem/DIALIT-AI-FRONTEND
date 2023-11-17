import axios from 'axios';
import { refreshTokenRequest } from '../modules/Swiftsync.class';


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('access');

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
  async function (error) {
    
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refresh');

      if (!refreshToken) {
        // window.location.href='/signin'
      }

      try {
        const response = await refreshTokenRequest({ refresh: refreshToken });
        const newAccessToken = response?.access;

        // Update the access token in local storage
        localStorage.setItem('access', newAccessToken);

        // Update the Authorization header and retry the original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // window.location.href='/signin'
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
