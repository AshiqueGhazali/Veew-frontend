const adminRoutes = {
  login: "/admin/login",
  getToken: "/admin/getToken",
  adminLogout: "/admin/logout",
  getUsersData: "/admin/getUsersData",
  blockUser: "/admin/blockUser",
  addPlan: "/admin/addPlan",
  getPlans: "/admin/getPlan",
  updatePlan: "/admin/updatePlan",
  deletePlan:"/admin/deletePlan",
  getSubscribers:'/admin/getAllSubscribers',
  getAllEvents:'/admin/getAllEvents',
  getAllCategories:'/admin/getAllCategoris',
  adminCancelEvent: '/admin/cancellEvent',
  getAllTickets:'/admin/getAllTickets',
  getDataCounts:'/admin/getDataCounts',
  getDashboardDatas:'/admin/getDashboardData',
  getAdminEventApprovals:'/admin/getAdminEventApprovals',
  approveFund:'/admin/approveFund',
  getUserReports:'/admin/getUserReports',
  getEventReports:'/admin/getEventReports'
};

export default adminRoutes;
