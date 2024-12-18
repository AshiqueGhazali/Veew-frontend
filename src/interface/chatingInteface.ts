

export default interface IConverasation{
    id:string,
    firstUserId:string,
    secondUserId:string,
    createdAt:string,
    updatedAt:string
}


export  interface IMessage{
    id:string,
    conversationId:string,
    senderId:string;
    receiverId:string;
    message:string;
    createdAt:string,
    updateAt:string
}