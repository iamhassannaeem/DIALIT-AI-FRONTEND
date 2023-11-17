import { Id } from 'react-toastify';
import axios from '../axiosConfig/Axios';
import endpoints from '../endpoints/ApiEndpoints';

// Define types for the category and payload
type payload = any; // You can specify a more specific type

// Define the type for the response object (customize as needed)
interface ApiResponse {
  success: boolean;
  message: string;
}

// register
export const register = async (payload: payload): Promise<ApiResponse> => {
  try {
    const response = await axios.post(endpoints.register, payload);
    return response.data as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
// login
export const login = async (payload: payload): Promise<ApiResponse> => {
  try {
    const response = await axios.post(endpoints.login, payload);
    return response.data as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
// refresh token
export const refreshTokenRequest = async (
  payload: payload
): Promise<ApiResponse> => {
  try {
    const response = await axios.post(endpoints.refreshTokenRequest, payload);
    return response.data as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};


// organisation create
export const organisationCreate = async (
  payload: payload
): Promise<ApiResponse> => {
  try {
    const response = await axios.post(endpoints.organisationCreate, payload);
    console.log('before',response);
    return response.data as ApiResponse;
    
  } catch (error: any) {
    console.log('after',error);

    return { success: false, message: error.message };
  }
};
// Assign Role
export const roleAssign = async (payload: payload): Promise<ApiResponse> => {
  try {
    const response = await axios.post(endpoints.roleAssign,payload);
    return response.data as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
// upload user image 
export const uploadProfile = async (payload: payload): Promise<ApiResponse> => {
  try {
    const response = await axios.post(endpoints.uploadProfile, payload);
    return response.data as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}; 

// package create
export const createPackage = async (payload: payload): Promise<ApiResponse> => {
  try {
    const response = await axios.post(endpoints.createPackage, payload);
    return response.data as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error };
  }
}; 

// package get
export const getPackages = async (payload: payload): Promise<ApiResponse> => {
  try {
    const response = await axios.get(endpoints.getPackages, payload);
    return response.data as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
// organisation get
export const organisationget = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get(endpoints.organisationget);
    return response.data as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
// organisationDetail get
export const organisationDetailGet = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await axios.get(`${endpoints.organisationDetailGet}/${id}`);
    return response.data as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// package create
export const PostUser = async (payload: payload): Promise<ApiResponse> => {
  try {
    const response = await axios.post(endpoints.PostUser, payload);
    return response.data as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error };
  }
}; 
//  get user List
export const GetUserList = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get(endpoints.GetUserList);
    return response.data as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
//  get user Roles
export const GetRoles = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get(endpoints.GetRoles);
    return response.data as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
// Change user Roles
export const changePermission = async (payload: payload,id: number): Promise<ApiResponse> => {
  try {
    const response = await axios.patch(`${endpoints.changePermission}${id}/`, payload);
    return response.data as ApiResponse;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
//  get user Roles
export const isAdmin = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get(endpoints.isAdmin);
    return response.data as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
// update user data
export const PostUserData = async (payload: payload): Promise<ApiResponse> => {
  try {
    const response = await axios.patch(`${endpoints.isAdmin}`, payload);
    return response.data as ApiResponse;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
//  get Stat
export const GetStats = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get(endpoints.GetStats);
    return response.data as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
//  filter Stat
export const filterStats = async (organization, to, from) => {
  try {
    // Format the dates to match the desired format "yyyy-MM-dd"
    const formattedTo = new Date(to).toISOString().split('T')[0];
    const formattedFrom = new Date(from).toISOString().split('T')[0];

    const response = await axios.get(`${endpoints.GetStats}/`, {
      params: {
        organization,
        from: encodeURIComponent(formattedFrom),
        to: encodeURIComponent(formattedTo),
      },
    });

    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
// start mapping(Click on start button)
export const activeUser = async (payload: payload): Promise<ApiResponse> => {
  try {
    const response = await axios.patch(endpoints.activeUser,payload);
    return response.data as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
// edit user name (setup/user)
export const EditUserName = async (payload: payload): Promise<ApiResponse> => {
  try {
    const response = await axios.patch(endpoints.isAdmin,payload);
    return response.data as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};