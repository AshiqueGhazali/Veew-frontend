import React from "react";
import IEvents from "../../../interface/EventsInterface";
import { useNavigate } from "react-router-dom";

interface EventCardProps {
  eventData:IEvents
}

const UserProfileEventCard: React.FC<EventCardProps> = ({ eventData}) => {
  const navigate = useNavigate()
  const navigateTODetailPage = (eventId:string)=>{
    navigate(`/event-details?eventId=${eventId}`)
  }
  return (
    <div className="bg-white rounded-lg p-4 shadow-md sm:w-full">
      <div className="flex justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h3 className="text-lg font-semibold">{eventData.eventTitle}</h3>
            <p className="text-gray-500 text-sm mt-2">{eventData.description}</p>
          </div>
        </div>
        <div className="text-blue-500 cursor-pointer text-sm" onClick={()=>navigateTODetailPage(eventData.id)}>view Details</div>
      </div>
      <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
      <div className="flex items-center justify-center">
        <button
          type="button"
          className="text-black hover:text-white border border-black hover:bg-arkblue focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
        >
          EDIT
        </button>
        <button
          type="button"
          className="text-black hover:text-white border border-black hover:bg-arkblue focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
        >
          CANCEL
        </button>
        <button
          type="button"
          className="text-black hover:text-white border border-black hover:bg-arkblue focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
        >
          START
        </button>
      </div>
    </div>
  );
};

export default UserProfileEventCard;
