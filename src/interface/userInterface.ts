export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age?: number;
  gender?: string;
  image?: string;
  phone?: string;
}


export enum EventTypes {
  SEMINAR = "SEMINAR",
  WEBINAR = "WEBINAR",
  WORKSHOP = "WORKSHOP",
  CONFERENCE = "CONFERENCE",
  OTHER = "OTHER"
}