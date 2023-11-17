
// src/services/authService.ts
import axios from 'axios';
import { isAdmin } from '../api/modules/Swiftsync.class';
import { setAdminStatus } from '../redux/slices/isAdminSlice';
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const AuthService = {
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${BASE_URL}user/token/`, { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  refreshToken: async (refreshToken: string) => {
    try {
      const response = await axios.post(`${BASE_URL}user/token/refresh/`, { refreshToken });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
 
};
export const isAdminfetchAdminStatus = () => {
  return async (dispatch: any) => { // You may need to define a proper dispatch type
    try {
      const response = await isAdmin(); // Your API call to check admin status
      dispatch(setAdminStatus(response));
    } catch (error) {
      // Handle error as needed
      console.error('Error fetching admin status:', error);
    }
  };
};