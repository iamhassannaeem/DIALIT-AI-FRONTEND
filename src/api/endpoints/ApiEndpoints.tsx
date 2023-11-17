export interface ApiEndpoints {
    login: string;
    register: string;
    refreshTokenRequest: string;
    organisationCreate:string;
    createPackage:string;
    getPackages:string;
    organisationget:string;
    organisationDetailGet:string,
    PostUser:string,
    GetUserList:string;
    GetRoles:string;
    changePermission:string;
    isAdmin:string;
    GetStats:string;
    uploadProfile:string;
    roleAssign:string;
    activeUser:string;
  }
  
  const endpoints: ApiEndpoints = {
    login: 'user/token/',
    register: 'user/register/',
    refreshTokenRequest: 'user/token/refresh/',
    organisationCreate: 'app/organization/',
    createPackage: 'app/package/',
    getPackages: 'app/package/',
    organisationget: 'app/organization/',
    organisationDetailGet: 'app/organization',
    PostUser:'user/',
    GetUserList: 'user/',
    GetRoles: 'user/perm/',
    changePermission: 'user/perm/',
    isAdmin: 'user/me/',
    roleAssign:'user/assign/',
    GetStats:'app/organization/stats',
    activeUser:'user/active/',
    uploadProfile:"user/profile_image/",

  };
  
  export default endpoints;
  