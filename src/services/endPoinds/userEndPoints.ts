
const userRoutes = {
  sendOtp: "/send-otp",
  verifyOtp: "/verify-otp",
  register: "/register",
  login: "/login",
  googleAuth:'/googleAuth',
  logout: "/logout",
  getToken: "/getToken",
  getUserProfileData: "/getUserData",
  setForgotPasswordOtp: "/setForgotPasswordOtp",
  verifyForgotPasswordOtp: "/verifyForgotPasswordOtp",
  resetPassword: "/resetPassword",
  editProfile: "/editProfile",
  getSubscriptionPlans: "/getAllPlans",
  createPayment:'/createPayment',
  subscribePlan:'/subscribePlan',
  getPlanOfUser:'/getPlanOfUser',
  createEvent: '/createEvent',
  getUpcomingEvents: '/getAllEvents',
  getAllCategories: '/getAllCategories',
  getEventDetails: '/getEventDetails',
  getHostedEvents: '/getHostedEvents',
  editEventDetails: '/editEventDetails',
  editEventDate : '/editEventDate',
  cancelEvent:'/cancelEvent',
  addAmountToWallet:'/addAmountToWallet',
  conformWalletAmount:'/conformWalletAmount',
  getUserWallet:'/getUserWallet',
  getWalletTransactions:'/getWalletTransactions',
  payForTicket:'/payForTicket',
  conformTicketBooking:'/conformTicketBooking',
  bookTicketWithWallet: '/bookTicketWithWallet',
  getAllUserTickets: '/getAllUserTickets',
  cancellTicket: '/cancellTicket',
  getAllTicketForEvent: '/getAllTicketForEvent'
};

export default userRoutes;
