
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
// get a phone number 
export const getPhoneNumber = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get(endpoints.addPhoneNumber);
    return response.data as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error };
  }
};
// Add a phone number 
export const addPhoneNumber = async (payload: payload): Promise<ApiResponse> => {
  try {
    const response = await axios.post(endpoints.addPhoneNumber, payload);
    return response.data as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error };
  }
};

// Inactive a phone number
export const inactivePhoneNumber = async (id:number,payload:payload): Promise<ApiResponse> => {
  try {
    const response = await axios.patch(`${endpoints.inactivePhoneNumber}${id}/update_status/`,payload);
    return response as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error };
  }
};
export const getFiles = async (fileType: string="" ): Promise<ApiResponse> => {
  try {
    const response = await axios.get(`${endpoints.getFiles}?file_type=${fileType}`);
    return response.data as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error };
  }
};
// get Download
export const downloadFile = async (name: string): Promise<ApiResponse> => {
  try {
    const response = await axios.get(`${endpoints.downloadFile}${name}/`, {
      responseType: 'blob', // Set the response type to 'blob'
    });
    return response as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error };
  }
};

// upload file 
export const uploadFile = async (payload: FormData): Promise<ApiResponse> => {
  try {
    // Make the request with the FormData
    const response = await axios.post(endpoints.uploadFile, payload, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the correct content type for file uploads
      },
    });

    return response.data as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error.message || 'File upload failed' };
  }
};
// delete the files
export const deleteFile = async (id:number): Promise<ApiResponse> => {
  try {
    const response = await axios.delete(`${endpoints.deleteFile}${id}/`);
    return response as ApiResponse;
  } catch (error: any) {
    return { success: false, message: error };
  }
};

// organisation create
// export const organisationCreate = async (
//   payload: Payload,
//   onNavigate: any
// ): Promise<ApiResponse> => {
//   try {
//     const response = await axios.post(endpoints.organisationCreate, payload);
//     return response.data as ApiResponse;
//   } catch (error: any) {
//     if (isAxiosError(error) && error.response?.status === 401) {
//       await handleTokenRefresh(onNavigate);
//       try {
//         const response = await axios.post(endpoints.PostUser, payload);
//         return response.data as ApiResponse;
//       } catch (refreshError: any) {
//         return { success: false, message: refreshError.message };
//       }
//     } else {
//       return { success: false, message: error };
//     }
//   }
// };
// Assign Role
//  get user Roles
export const isAdmin = async (onNavigate:any): Promise<ApiResponse> => {
  try {
    const response = await axios.get(endpoints.isAdmin);
    return response.data as ApiResponse;
  } catch (error: any) {
    return {success: false, error: error.message};
  }
};

//  filter Stat
// export const filterStats = async (organization, to, from,onNavigate:any) => {
//   try {
//     // Format the dates to match the desired format "yyyy-MM-dd"
//     const formattedTo = new Date(to).toISOString().split('T')[0];
//     const formattedFrom = new Date(from).toISOString().split('T')[0];

//     const response = await axios.get(`${endpoints.GetStats}/`, {
//       params: {
//         organization,
//         from: encodeURIComponent(formattedFrom),
//         to: encodeURIComponent(formattedTo),
//       },
//     },);

//     return response.data;
//   } catch (error:any) {
//     return handleTokenRefresh(error, onNavigate);
//   }
// };
