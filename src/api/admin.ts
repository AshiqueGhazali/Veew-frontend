// import { IPricingPlan } from "../interface/pricingInterface";
import Api from "../services/axios";
import adminRoutes from "../services/endPoinds/adminEndPoints";

interface Response {
  status: number;
  data: {
    status?: boolean;
    message: string;
  };
}

interface LoginParams {
  userName: string;
  password: string;
}

interface adminGetTokenResponse {
  data: {
    status: boolean;
    decoded: object;
  };
}

interface IAddPlan {
  planId?: string;
  title: string;
  category: string;
  price: number | undefined;
  numberOfEvents: number | undefined;
  expireAfter: number | undefined;
  maxParticipents: number | undefined;
  idealFor: string;
}

interface dataCountResponse {
  status: number;
  data: {
    totalUsers:number;
    totalUpcomingEvents:number;
    totalExpairedEvents:number;
    totalSubscribers:number;
    totalTickets:number
  };
}

export const adminLogin = async ({
  userName,
  password,
}: LoginParams): Promise<Response> => {
  const response = await Api.post(adminRoutes.login, { userName, password });
  return response;
};

export const adminGetToken = async (): Promise<adminGetTokenResponse> =>
  await Api.get(adminRoutes.getToken);
export const adminLogout = async (): Promise<Response> =>
  await Api.post(adminRoutes.adminLogout);

export const getAllUsers = async () => await Api.get(adminRoutes.getUsersData);
export const blockUser = async (userId: string): Promise<Response> =>
  await Api.post(adminRoutes.blockUser, { userId });
export const addPlan = async (data: IAddPlan): Promise<Response> =>
  await Api.post(adminRoutes.addPlan, data);
export const getPlans = async () => await Api.get(adminRoutes.getPlans);
export const updatePlan = async (data: IAddPlan): Promise<Response> =>
  await Api.put(adminRoutes.updatePlan, data);
export const deletePlan = async(planId:string):Promise<Response>=>
  await Api.delete(`${adminRoutes.deletePlan}?planId=${planId}`)
export const getSubscribers = async()=>await Api.get(adminRoutes.getSubscribers)
export const getAllEvents = async()=>await Api.get(adminRoutes.getAllEvents)
export const getAllCategories = async()=>await Api.get(adminRoutes.getAllCategories)
export const adminCancelEvent = async(eventId:string)=>Api.patch(`${adminRoutes.adminCancelEvent}?eventId=${eventId}`)
export const getAllTickets = async()=>Api.get(adminRoutes.getAllTickets)
export const getDataCounts = async():Promise<dataCountResponse>=>await Api.get(adminRoutes.getDataCounts)
export const getDashboardDatas = async()=>await Api.get(adminRoutes.getDashboardDatas)
export const getAdminEventApprovals = async()=> await Api.get(adminRoutes.getAdminEventApprovals);
export const approveFund = async(eventId:string)=>await Api.post(adminRoutes.approveFund,{eventId})
export const getUserReports = async()=>await Api.get(adminRoutes.getUserReports)