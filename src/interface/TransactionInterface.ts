import { IUser } from "./userInterface";

export interface ITransaction {
    id: string;
    userId:IUser
    transactionType:"CREDIT" | "DEBIT";
    paymentIntentId:string;
    purpose:"WALLET" | "PRICING" | "TICKET"
    amount:number;
    createdAt: string;
 }
  
  