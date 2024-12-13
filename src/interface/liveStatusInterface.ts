import IEvents from "./EventsInterface";

export default interface ILiveStatus {
    id : string;
    eventId : string;
    startTime ?: string;
    endTime ?: string;
    isApproved?:boolean;
    approvedAmount?:number
    liveEvent:IEvents
}