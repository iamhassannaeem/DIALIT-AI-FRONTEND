
import axios from '../axiosConfig/Axios';
import { isAxiosError } from 'axios'
import endpoints from '../endpoints/ApiEndpoints';
import handleTokenRefresh from '../axiosConfig/Axios'
// Define types for the category and payload
type payload = any; // You can specify a more specific type

// Define the type for the response object (customize as needed)
interface ApiResponse {
  success: boolean;
  message: string;
}


// login
export const login = async (payload: payload): Promise<ApiResponse> => {
  try {
    const response = await axios.post(endpoints.login, payload);
    return response.data as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error };
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
  payload: Payload,
  onNavigate: any
): Promise<ApiResponse> => {
  try {
    const response = await axios.post(endpoints.organisationCreate, payload);
    return response.data as ApiResponse;
  } catch (error: any) {
    if (isAxiosError(error) && error.response?.status === 401) {
      await handleTokenRefresh(onNavigate);
      try {
        const response = await axios.post(endpoints.PostUser, payload);
        return response.data as ApiResponse;
      } catch (refreshError: any) {
        return { success: false, message: refreshError.message };
      }
    } else {
      return { success: false, message: error };
    }
  }
};
// Assign Role
export const roleAssign = async (
  payload: Payload,
  onNavigate: any
): Promise<ApiResponse> => {
  try {
    const response = await axios.post(endpoints.roleAssign, payload);
    return response.data as ApiResponse;
  } catch (error: any) {
    if (isAxiosError(error) && error.response?.status === 401) {
      await handleTokenRefresh(onNavigate);
      try {
        const response = await axios.post(endpoints.PostUser, payload);
        return response.data as ApiResponse;
      } catch (refreshError: any) {
        return { success: false, message: refreshError.message };
      }
    } else {
      return { success: false, message: error };
    }
  }
};
// upload user image 
export const uploadProfile = async (payload: payload,onNavigate:any): Promise<ApiResponse> => {
  try {
    const response = await axios.post(endpoints.uploadProfile, payload);
    return response.data as ApiResponse;
  } catch (error: any) {
    return handleTokenRefresh(error, onNavigate);
  }
}; 

// package create
export const createPackage = async (
  payload: Payload,
  onNavigate: any
): Promise<ApiResponse> => {
  try {
    const response = await axios.post(endpoints.createPackage, payload);
    return response.data as ApiResponse;
  } catch (error: any) {
    if (isAxiosError(error) && error.response?.status === 401) {
      await handleTokenRefresh(onNavigate);
      try {
        const response = await axios.post(endpoints.PostUser, payload);
        return response.data as ApiResponse;
      } catch (refreshError: any) {
        return { success: false, message: refreshError.message };
      }
    } else {
      return { success: false, message: error };
    }
  }
};
// package get
export const getPackages = async (onNavigate:any): Promise<ApiResponse> => {
  try {
    const response = await axios.get(endpoints.getPackages);
    return response.data as ApiResponse;
  } catch (error: any) {
    return handleTokenRefresh(error, onNavigate);
  }
};
// organisation get
export const organisationget = async (onNavigate:any): Promise<ApiResponse> => {
  try {
    const response = await axios.get(endpoints.organisationget);
    return response.data as ApiResponse;
  } catch (error: any) {
    return handleTokenRefresh(error, onNavigate);
  }
};
// organisationDetail get
export const organisationDetailGet = async (id: number,onNavigate:any): Promise<ApiResponse> => {
  try {
    const response = await axios.get(`${endpoints.organisationDetailGet}/${id}`);
    return response.data as ApiResponse;
  } catch (error: any) {
    return handleTokenRefresh(error, onNavigate);
  }
};


export const PostUser = async (
  payload: Payload,
  onNavigate: any
): Promise<ApiResponse> => {
  try {
    const response = await axios.post(endpoints.PostUser, payload);
    return response.data as ApiResponse;
  } catch (error: any) {
    if (isAxiosError(error) && error.response?.status === 401) {
      await handleTokenRefresh(onNavigate);
      try {
        const response = await axios.post(endpoints.PostUser, payload);
        return response.data as ApiResponse;
      } catch (refreshError: any) {
        return { success: false, message: refreshError.message };
      }
    } else {
      return { success: false, message: error };
    }
  }
};

//  get user List
export const GetUserList = async (onNavigate:any): Promise<ApiResponse> => {
  try {
    const response = await axios.get(endpoints.GetUserList);
    return response.data as ApiResponse;
  } catch (error: any) {
    return handleTokenRefresh(error, onNavigate);
  }
};
//  get user Roles
export const GetRoles = async (onNavigate:any): Promise<ApiResponse> => {
  try {
    const response = await axios.get(endpoints.GetRoles);
    return response.data as ApiResponse;
  } catch (error: any) {
    return handleTokenRefresh(error, onNavigate);
  }
};
// Change user Roles
export const changePermission = async (
  payload: payload,id: number,onNavigate:any
): Promise<ApiResponse> => {
  try {
    const response = await axios.patch(`${endpoints.changePermission}${id}/`, payload);
    return response.data as ApiResponse;
  } catch (error: any) {
    if (isAxiosError(error) && error.response?.status === 401) {
      await handleTokenRefresh(onNavigate);
      try {
        const response = await axios.post(endpoints.PostUser, payload);
        return response.data as ApiResponse;
      } catch (refreshError: any) {
        return { success: false, message: refreshError.message };
      }
    } else {
      return { success: false, message: error };
    }
  }
};

//  get user Roles
export const isAdmin = async (onNavigate:any): Promise<ApiResponse> => {
  try {
    const response = await axios.get(endpoints.isAdmin);
    return response.data as ApiResponse;
  } catch (error: any) {
    return {success: false, error: error.message};
  }
};
// update user data
export const PostUserData = async (payload: payload,onNavigate:any): Promise<ApiResponse> => {
  try {
    const response = await axios.patch(`${endpoints.isAdmin}`, payload);
    return response.data as ApiResponse;
  } catch (error:any) {
    return handleTokenRefresh(error, onNavigate);
  }
};

//  filter Stat
export const filterStats = async (organization, to, from,onNavigate:any) => {
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
    },);

    return response.data;
  } catch (error:any) {
    return handleTokenRefresh(error, onNavigate);
  }
};
// start mapping(Click on start button)
export const activeUser = async (payload: payload,onNavigate:any): Promise<ApiResponse> => {
  try {
    const response = await axios.patch(endpoints.activeUser,payload);
    return response.data as ApiResponse;
  } catch (error: any) {
    return handleTokenRefresh(error, onNavigate);
  }
};
// edit user name (setup/user)
export const EditUserName = async (payload: payload,onNavigate:any): Promise<ApiResponse> => {
  try {
    const response = await axios.patch(endpoints.isAdmin,payload);
    return response.data as ApiResponse;
  } catch (error: any) {
    return handleTokenRefresh(error, onNavigate);
  }
};
//  create role

export const CreateRole = async (
  payload: Payload,
  onNavigate: any
): Promise<ApiResponse> => {
  try {
    const response = await axios.post(endpoints.GetRoles, payload);
    return response.data as ApiResponse;
  } catch (error: any) {
    if (isAxiosError(error) && error.response?.status === 401) {
      await handleTokenRefresh(onNavigate);
      try {
        const response = await axios.post(endpoints.PostUser, payload);
        return response.data as ApiResponse;
      } catch (refreshError: any) {
        return { success: false, message: refreshError.message };
      }
    } else {
      return { success: false, message: error };
    }
  }
};

//del role
export const DelRole = async (id:number,onNavigate:any): Promise<ApiResponse> => {
  try {
    const response = await axios.delete(`${endpoints.GetRoles}${id}`);
    return response.data as ApiResponse;
  } catch (error: any) {
    return handleTokenRefresh(error, onNavigate);
  }
};