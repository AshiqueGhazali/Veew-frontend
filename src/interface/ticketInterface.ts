import IEvents from "./EventsInterface";
import { IUser } from "./userInterface";

export interface ITickets {
    id:string;
    ticketCode:string;
    userId:string;
    eventId:string;
    amount:number;
    isCancelled?:boolean;
    ticketOwner:IUser,
    eventDetails:IEvents
}