import React, { useState } from "react";
import IEvents from "../../../interface/EventsInterface";
import { useNavigate } from "react-router-dom";
import "./SingleEventCard.css";

import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";

interface eventCardProps {
  category: string;
  events: IEvents[] | null;
  searchQuery: string;
}

const SingleEventCard: React.FC<eventCardProps> = ({
  events,
  category,
  searchQuery,
}) => {
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const navigate = useNavigate();

  const parseEventDateTime = (date: string, endTime: string): Date => {
    const eventDate = new Date(date);
    const [hours, minutes] = endTime.split(":").map(Number);
    eventDate.setHours(hours, minutes);
    return eventDate;
  };

  const filterdEvents = events?.filter((event) => {
    const eventDateTime = parseEventDateTime(event.date, event.endTime);
    const currentDate = new Date();
    const isUpcoming = eventDateTime >= currentDate;

    return (
      event.category.includes(category) &&
      event.isCancelled === false &&
      // isUpcoming &&
      (event.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const toggleAcrionbar = (eventId:string) => {
    setOpenActionId((prev) => (prev === eventId ? null : eventId));
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
        {filterdEvents?.map((event, index) => {
          return (
            <div>
              <div className="flex justify-between mb-2">
                <div className="flex  gap-2">
                  <div className="relative w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    {event.user.image ? (
                      <img src={event.user.image} alt="" className="w-5 h-5" />
                    ) : (
                      <svg
                        className="absolute w-12 h-12 text-gray-400 -left-1"
                        fill="currentColor"
                        viewBox="0 0 35 35"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    )}
                  </div>
                  <p className="text-sm max-w-[150px] truncate cursor-pointer">{`${event.user.firstName} ${event.user.lastName}`}</p>
                </div>

                <div>
                  <svg
                    onClick={()=>toggleAcrionbar(event.id)}
                    className="w-5 h-5"
                    aria-hidden="true"
                    id="dropdownDotsHorizontalddd"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>

                  {openActionId === event.id  && (
                    <div
                      id="dropdownDotsHorizontal"
                      onMouseLeave={()=>toggleAcrionbar(event.id)}
                      className="z-10 absolute divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700 divide-gray-600"
                    >
                      <ul
                        className="py-2 text-sm list-none text-gray-200"
                        aria-labelledby="dropdownMenuIconHorizontalButton"
                      >
                        <li>
                          <a
                            className="block no-underline px-4 py-2 text-gray-200 hover:bg-gray-600 hover:text-white cursor-pointer"
                          >
                            view Details
                          </a>
                        </li>
                        <li>
                          <a
                            className="block no-underline px-4 py-2 text-gray-200 hover:bg-gray-600 hover:text-white cursor-pointer"
                          >
                            report event
                          </a>
                        </li>
                        <li>
                          <a
                            className="block no-underline px-4 py-2 text-gray-200 hover:bg-gray-600 hover:text-white cursor-pointer"
                          >
                            report auther
                          </a>
                        </li>
                      </ul>
                      <div className="py-2">
                        <a
                          className="block no-underline px-4 py-2 text-sm  hover:bg-gray-600 text-gray-200 hover:text-white cursor-pointer"
                        >
                          Separated link
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div
                className="event-card"
                key={index}
                onClick={() => navigate(`/event-details?eventId=${event.id}`)}
              >
                <img src={event.imageUrl} alt="" />
              </div>
              <div>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <div className="flex gap-1">
                      <FaRegThumbsUp onClick={()=>navigate('')} className="cursor-pointer"/>
                      <p className="text-xs">{event.likes}</p>
                    </div>
                    <div className="flex gap-1">
                      <FaRegComment onClick={()=>navigate('')} className="cursor-pointer" />
                      <p className="text-xs">{event.comments}</p>
                    </div>
                  </div>
                  <p className="text-xs">
                    {new Date(event.date).toDateString()}
                  </p>
                </div>
                <p className="text-sm mt-1">{event.eventTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SingleEventCard;
