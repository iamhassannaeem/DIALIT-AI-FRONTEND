export interface ApiEndpoints {
    login: string;
    refreshTokenRequest: string;
    addPhoneNumber:string;
  }
  
  const endpoints: ApiEndpoints = {
    login: 'user/token/',
    refreshTokenRequest: 'user/token/refresh/',
    addPhoneNumber:'ai_call_agent/twillio_auth/'

  };
  
  export default endpoints;
  