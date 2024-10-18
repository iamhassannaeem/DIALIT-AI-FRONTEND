export interface ApiEndpoints {
    login: string;
    refreshTokenRequest: string;
    addPhoneNumber:string;
    getFiles:string;
    uploadFile:string;
    downloadFile:string;
    deleteFile:string;
    inactivePhoneNumber:string;
  }
  
  const endpoints: ApiEndpoints = {
    login: 'user/token/',
    refreshTokenRequest: 'user/token/refresh/',
    addPhoneNumber:'ai_call_agent/twillio_auth/',
    getFiles:'/ai_call_agent/library/',
    downloadFile:'ai_call_agent/library/download/',
    uploadFile:'/ai_call_agent/library/',
    deleteFile:'ai_call_agent/library/',
    inactivePhoneNumber:"ai_call_agent/twillio_auth/",

  };
  
  export default endpoints;
  