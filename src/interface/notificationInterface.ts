import { IUser } from "./userInterface";

export interface INotifications {
    id: string;
    notificationHead:string;
    notification:string;
    userData?:IUser;
    createdAt:Date
}