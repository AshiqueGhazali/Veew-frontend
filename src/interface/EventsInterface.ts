import { IUser } from "./userInterface";

export default interface IEvents {
    category: string;
    createdAt: string;
    date: string;
    deletedAt: string | null;
    description: string;
    endTime: string;
    eventTitle: string;
    hostsId: string;
    id: string;
    imageUrl: string;
    participantCount: number;
    startTime: string;
    ticketPrice: number;
    updatedAt: string;
    isCancelled:boolean;
    user: IUser;
}