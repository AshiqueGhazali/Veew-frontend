import { IPricingPlan } from "../interface/pricingInterface";
import { IUser } from "../interface/userInterface";
import Api from "../services/axios";
import userRoutes from "../services/endPoinds/userEndPoints";

interface Response {
  status: number;
  data: {
    status?: boolean;
    message: string;
  };
}

interface RegisterParams {
  firstName: string;
  lastName: string;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  status: number;
  data: {
    status: boolean;
    message: string;
    token?: string;
    userData?: IUser;
  };
}

interface getTokenRes {
  status:number,
  data: {
    status: boolean;
    decoded?: object;
  };
}

interface editProfileParams {
  id: string;
  firstName: string;
  lastName: string;
  phone?: string;
  gender?: string;
  age?: number;
  image?: string;
}

interface getPlansResponse {
  status: number;
  data: IPricingPlan[] | null;
}

interface editEventParams {
  eventId: string;
  eventTitle: string;
  description: string;
  ticketPrice: number;
}

interface editDateParams {
  eventId: string;
  date: string;
  startTime: string;
  endTime: string;
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

interface IProfileStatusesResponse {
  status:number,
  data: {
    totalEvents: number;
    subscription: string;
    totalTickets: number;
    totalEarnings: number;
  };
}

interface ILikedEventsIdResponse {
  status:number,
  data: string[] | null
}

export const sendOtp = async (email: string): Promise<Response> => {
  const response = await Api.post(userRoutes.sendOtp, { email });
  return {
    status: response.status,
    data: response.data,
  };
};

export const setForgotPasswordOtp = async (
  email: string
): Promise<Response> => {
  const response = await Api.post(userRoutes.setForgotPasswordOtp, { email });
  return {
    status: response.status,
    data: response.data,
  };
};

export const verifyOtp = async (userOtp: number): Promise<Response> => {
  const response = await Api.post(userRoutes.verifyOtp, { userOtp });

  return {
    status: response.status,
    data: response.data,
  };
};

export const verifyForgotPasswordOtp = async (
  userOtp: number,
  email: string
): Promise<Response> => {
  const response = await Api.post(userRoutes.verifyForgotPasswordOtp, {
    userOtp,
    email,
  });
  return {
    status: response.status,
    data: response.data,
  };
};

export const userRegister = async ({
  firstName,
  lastName,
  password,
}: RegisterParams): Promise<Response> => {
  const response = await Api.post(userRoutes.register, {
    firstName,
    lastName,
    password,
  });
  return {
    status: response.status,
    data: response.data,
  };
};

export const userLogin = async ({
  email,
  password,
}: LoginParams): Promise<LoginResponse> => {
  const response = await Api.post(userRoutes.login, { email, password });
  return response;
};

export const resetPassword = async (
  email: string,
  password: string
): Promise<Response> =>
  await Api.post(userRoutes.resetPassword, { password, email });

export const googleAuth = async (
  email: string,
  firstName: string,
  lastName: string,
  image: string
) =>
  await Api.post(userRoutes.googleAuth, { email, firstName, lastName, image });

export const userLogout = async (): Promise<Response> =>
  await Api.post(userRoutes.logout);
export const getToken = async (): Promise<getTokenRes> =>
  await Api.get(userRoutes.getToken);
export const getUserProfileData = async (userId?: string) =>
  await Api.get(`${userRoutes.getUserProfileData}?userId=${userId}`);
export const editProfile = async ({
  id,
  firstName,
  lastName,
  phone,
  gender,
  age,
  image,
}: editProfileParams): Promise<Response> =>
  await Api.patch(userRoutes.editProfile, {
    id,
    firstName,
    lastName,
    phone,
    gender,
    age,
    image,
  });
export const uploadImg = async (formData: any): Promise<Response> =>
  await Api.post("/upload-img", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getSubscriptionPlans = async (): Promise<getPlansResponse> => {
  const response = await Api.get(userRoutes.getSubscriptionPlans);
  return {
    status: response.status,
    data: response.data,
  };
};

export const createPayment = async (planId: string) =>
  await Api.post(userRoutes.createPayment, { planId });
export const subscribePlan = async (
  planId: string,
  sessionId: string
): Promise<Response> =>
  await Api.post(userRoutes.subscribePlan, { planId, sessionId });
export const getPlanOfUser = async () =>
  await Api.get(userRoutes.getPlanOfUser);
export const createEvent = async (data: FormData) =>
  await Api.post(userRoutes.createEvent, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getUpcomingEvents = async () =>
  await Api.get(userRoutes.getUpcomingEvents);
export const getAllCategories = async () =>
  await Api.get(userRoutes.getAllCategories);
export const getEventDetails = async (eventId: string) =>
  Api.get(`${userRoutes.getEventDetails}?eventId=${eventId}`);
export const getHostedEvents = async () => Api.get(userRoutes.getHostedEvents);
export const editEventDetails = async (data: editEventParams) =>
  Api.patch(userRoutes.editEventDetails, data);
export const editEventDate = async (data: editDateParams) =>
  Api.patch(userRoutes.editEventDate, data);
export const cancelEvent = async (eventId: string) =>
  Api.patch(`${userRoutes.cancelEvent}?eventId=${eventId}`);
export const addAmountToWallet = async (amount: number) =>
  Api.post(userRoutes.addAmountToWallet, { amount });
export const conformWalletAmount = async (
  sessionId: string
): Promise<Response> =>
  await Api.post(userRoutes.conformWalletAmount, { sessionId });
export const getUserWallet = async () =>
  await Api.get(userRoutes.getUserWallet);
export const getWalletTransactions = async () =>
  await Api.get(userRoutes.getWalletTransactions);
export const payForTicket = async (eventId: string) =>
  await Api.post(userRoutes.payForTicket, { eventId });
export const conformTicketBooking = async (
  eventId: string,
  sessionId: string
): Promise<Response> =>
  await Api.post(userRoutes.conformTicketBooking, { eventId, sessionId });
export const bookTicketWithWallet = async (
  eventId: string
): Promise<Response> =>
  await Api.post(userRoutes.bookTicketWithWallet, { eventId });
export const getAllUserTickets = async()=>await Api.get(userRoutes.getAllUserTickets)
export const cancellTicket = async(ticketId:string)=>await Api.post(userRoutes.cancellTicket , {ticketId})
export const getAllTicketForEvent = async(eventId:string)=>await Api.get(`${userRoutes.getAllTicketForEvent}?eventId=${eventId}`)
export const startEvent = async(eventId:string)=>await Api.get(`${userRoutes.startEvent}?eventId=${eventId}`)
export const verifyEventJoining= async(meetUrl:string)=> await Api.get(`${userRoutes.verifyEventJoining}?meetURL=${meetUrl}`)
export const getDataCounts = async():Promise<dataCountResponse>=>await Api.get(userRoutes.getDataCounts)
export const getNotifications = async()=>await Api.get(userRoutes.getNotifications)
export const getProfileStatus = async():Promise<IProfileStatusesResponse>=>await Api.get(userRoutes.getProfileStatus)
export const setEventStartTime = async(eventId:string,startTime:string)=>await Api.post(userRoutes.setEventStartTime,{eventId,startTime})
export const setEventEndTime = async(eventId:string, endTime:string)=>await Api.post(userRoutes.setEventEndTime,{eventId, endTime})
export const addLike = async(eventId:string)=>await Api.post(userRoutes.addLike,{eventId})
export const removeLike = async(eventId:string)=>await Api.post(userRoutes.removeLike,{eventId})
export const getLikedEventsId = async():Promise<ILikedEventsIdResponse>=>await Api.get(userRoutes.getLikedEventsId)
export const postComment = async(eventId:string,comment:string,parentId:string|null)=>await Api.post(userRoutes.postComment,{eventId,comment,parentId})
export const getEventComments = async(eventId:string)=>await Api.get(`${userRoutes.getEventComments}?eventId=${eventId}`)
export const deleteComment = async(commentId:string)=>await Api.delete(`${userRoutes.deleteComment}?commentId=${commentId}`)
export const reportUser = async(reportedUserId:string,reason:string)=> await Api.post(userRoutes.reportUser,{reportedUserId,reason})
export const reportEvent = async(reportedEventId:string,reason:string)=> await Api.post(userRoutes.reportEvent,{reportedEventId,reason})
export const getEventLiveUpdates = async(eventId:string)=>await Api.get(`${userRoutes.getEventLiveUpdates}?eventId=${eventId}`)

export const createConversation = async(firstUserId:string , secondUserId:string)=>await Api.post(userRoutes.createConversation,{firstUserId,secondUserId})
export const getConverasations = async()=>await Api.get(userRoutes.getConverasation)
export const storeMessage = async(conversationId:string, senderId:string , receiverId:string,message:string)=>await Api.post(userRoutes.storeMessage,{conversationId, senderId , receiverId,message})
export const getMessage = async(conversationId:string)=>await Api.get(`${userRoutes.getMessage}?conversationId=${conversationId}`)
export const getUserDataById = async(userId:string)=>await Api.get(`${userRoutes.getUserDataById}?userId=${userId}`)