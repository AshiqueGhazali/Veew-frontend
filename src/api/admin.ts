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
