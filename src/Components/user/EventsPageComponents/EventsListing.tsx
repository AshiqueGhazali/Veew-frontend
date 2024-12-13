import React, { useEffect, useState } from "react";
import IEvents from "../../../interface/EventsInterface";
import "./EventsListing.css";

import SingleEventCard from "./SingleEventCard";
import { getLikedEventsId } from "../../../api/user";

interface eventCardProps {
  category: string;
  events: IEvents[] | null;
  searchQuery: string;
}

const EventsListing: React.FC<eventCardProps> = ({
  events,
  category,
  searchQuery,
}) => {
  const [allEvents , setAllEvents] = useState<IEvents[] | null>(null)
  const [likedEvents, setLikedEvents] = useState<string[] | null>([]);


  // const parseEventDateTime = (date: string, endTime: string): Date => {
  //   const eventDate = new Date(date);
  //   const [hours, minutes] = endTime.split(":").map(Number);
  //   eventDate.setHours(hours, minutes);
  //   return eventDate;
  // };

  const filterdEvents = allEvents?.filter((event) => {
    // const eventDateTime = parseEventDateTime(event.date, event.endTime);
    // const currentDate = new Date();
    // const isUpcoming = eventDateTime >= currentDate;

    return (
      event.category.includes(category) &&
      event.isCancelled === false &&
      // isUpcoming &&
      (event.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });


  useEffect(() => {
    if (events) {
      setAllEvents(events);
    }
  }, [events]);

  useEffect(()=>{
    const getAllLikes = async()=>{
      try {
        const response = await getLikedEventsId()

        if(response.status===200){          
          setLikedEvents(response.data)          
        }
      } catch (error) {
        console.log(error);
        
      }
    }

    getAllLikes()
  },[])

  


  const arr = [1,2,3,4,5,6,7,8]
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 justify-items-center">
        {!filterdEvents &&
          arr.map((val) => {
            return (
              <div
              key={val}
                role="status"
                className="flex items-center justify-center h-56 w-64 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
              >
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            );
          })}
        {filterdEvents?.map((event, index) => {
          return (
            <SingleEventCard eventData={event} isLiked={likedEvents?.includes(event.id) ? true : false} key={index}/>
          );
        })}
      </div>
    </>
  );
};

export default EventsListing;
