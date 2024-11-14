export interface ApiEndpoints {
  signUp: string;
  login: string;
  refreshTokenRequest: string;
  addPhoneNumber: string;
  forgetPassword: string;
  newPassword: string;
  resetPassword: string;
  logOut:string;
  activate:string;
  getFiles: string;
  uploadFile: string;
  downloadFile: string;
  deleteFile: string;
  replaceFile:string;
  inactivePhoneNumber: string;
  createAgent: string;
  agentDetails: string;
  publishAgent: string;
  deleteQuestion: string;
  compaignsList: string;
  callDetails: string;
  feedbackReport: string;
  stopCompaign: string;
}

const endpoints: ApiEndpoints = {
  signUp: 'user/register/',
  login: 'user/login/',
  refreshTokenRequest: 'user/token/refresh/',
  forgetPassword:'user/password_reset_request/',
  newPassword: 'user/forgot/password/',
  resetPassword:"user/reset/password/",
  activate:"user/activate/",
  logOut: 'user/logout/',
  addPhoneNumber: 'agent/twillio_auth/',
  getFiles: 'agent/library/',
  downloadFile: 'agent/library/download/',
  uploadFile: 'agent/library/',
  deleteFile: 'agent/library/',
  replaceFile: 'agent/library/replace/',
  inactivePhoneNumber: 'agent/twillio_auth/',
  createAgent: 'agent/agent/',
  agentDetails: 'agent/agents/InputData/',
  publishAgent: 'agent/agent/',
  deleteQuestion: 'agent/questions/',
  compaignsList:'agent/campaigns/',
  callDetails:'agent/call/details/',
  feedbackReport:'agent/feedbackreport/',
  stopCompaign:"/agent/stopcampaigns/"
};

export default endpoints;
