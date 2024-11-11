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
  inactivePhoneNumber: string;
  createAgent: string;
  agentDetails: string;
  publishAgent: string;
  deleteQuestion: string;
  compaignsList: string;
  callDetails: string;
  feedbackReport: string;
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
  inactivePhoneNumber: 'agent/twillio_auth/',
  createAgent: 'agent/agent/',
  agentDetails: 'agent/agents/InputData/',
  publishAgent: 'agent/agent/',
  deleteQuestion: 'agent/feedback-questions/',
  compaignsList:'agent/campaigns/',
  callDetails:'agent/call/details/',
  feedbackReport:'agent/feedbackreport/'
};

export default endpoints;
