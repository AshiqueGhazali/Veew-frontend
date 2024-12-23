import React from "react";
import { IUser } from "../../../interface/userInterface";
import { IMessage } from "../../../interface/chatingInteface";
import { format } from "timeago.js";
import profileAvtar from "../../../assets/man-profile.jpeg";

interface messageProp {
  user?: IUser;
  messages: IMessage;
}
export const IncomingMessages: React.FC<messageProp> = ({ user, messages }) => {
  return (
    <div className="flex items-start gap-2.5 mt-2">
      <img
        className="w-8 h-8 rounded-full"
        src={user?.image || profileAvtar}
        alt="Jese image"
      />
      <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-[#ffffff] rounded-e-xl rounded-es-xl">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {`${user?.firstName}`}
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {format(new Date(messages.createdAt), "p")}
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          {messages.message}
        </p>
      </div>
    </div>
  );
};

export const OutGoingMessages: React.FC<messageProp> = ({ user, messages }) => {
  return (
    <div className="flex items-start gap-2.5 justify-end mt-2">
      <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-[#dcffd1] rounded-e-xl rounded-es-xl">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            You
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {format(new Date(messages.createdAt), "p")}
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          {messages.message}
        </p>
      </div>
      <img
        className="w-8 h-8 rounded-full"
        src={user?.image || profileAvtar}
        alt="Jese image"
      />
    </div>
  );
};
