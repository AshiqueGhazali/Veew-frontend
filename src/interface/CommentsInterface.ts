import IEvents from "./EventsInterface";
import { IUser } from "./userInterface";

export default interface IComments {
    id:string,
    CommentedEvent:IEvents;
    CommentedBy:IUser;
    comment:string;   
    createdAt:Date;
    Replies:IComments
}