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
    password: string
}

interface LoginResponse {
    status:number;
    data:{
        status:boolean,
        message:string,
        token?:string,
        userData?:IUser
    }
}

interface getTokenRes {
    data: {
      status:boolean,
      decoded?:object
    };
}

interface editProfileParams {
    id:string
    firstName: string;
    lastName: string;
    phone?:string;
    gender?:string;
    age?:number;
    image?:string
}

export const sendOtp = async(email:string):Promise<Response> =>{
    const response = await Api.post(userRoutes.sendOtp, { email })
    return {
        status:response.status,
        data: response.data
    }
}

export const setForgotPasswordOtp = async(email:string):Promise<Response> =>{
    const response = await Api.post(userRoutes.setForgotPasswordOtp, { email })
    return {
        status:response.status,
        data: response.data
    }
}

export const verifyOtp = async(userOtp:number):Promise<Response> =>{
    const response = await Api.post(userRoutes.verifyOtp, { userOtp });
    
    return {
        status:response.status,
        data: response.data
    } 
}

export const verifyForgotPasswordOtp = async(userOtp:number, email:string):Promise<Response> =>{
    const response = await Api.post(userRoutes.verifyForgotPasswordOtp, { userOtp, email });
    return {
        status:response.status,
        data: response.data
    } 
}


export const userRegister = async({firstName,lastName,password}:RegisterParams):Promise<Response> =>{
    const response = await Api.post(userRoutes.register,{firstName,lastName,password})
    return {
        status:response.status,
        data: response.data
    }
}

export const userLogin = async({email,password}:LoginParams):Promise<LoginResponse>=>{
    const response = await Api.post(userRoutes.login,{email,password});
    return response
}

export const resetPassword = async(email:string,password:string):Promise<Response>=>await Api.post(userRoutes.resetPassword,{password,email})

export const userLogout = async():Promise<Response>=>await Api.post(userRoutes.logout)
export const getToken = async (): Promise<getTokenRes> => await Api.get(userRoutes.getToken);
export const getUserProfileData = async(userId?:string) => await Api.get(`${userRoutes.getUserProfileData}?userId=${userId}`)
export const editProfile= async({id,firstName,lastName,phone,gender,age,image}:editProfileParams):Promise<Response>=>await Api.patch(userRoutes.editProfile,{id,firstName,lastName,phone,gender,age,image})
export const uploadImg = async(formData:any):Promise<Response>=>await Api.post('/upload-img',formData,{headers: {
    'Content-Type': 'multipart/form-data',
},})