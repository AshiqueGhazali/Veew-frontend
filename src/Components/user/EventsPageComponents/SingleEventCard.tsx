import React from "react";
import IEvents from "../../../interface/EventsInterface";
import { useNavigate } from "react-router-dom";
import './SingleEventCard.css'

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
      isUpcoming &&
      (event.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
        {filterdEvents?.map((event, index) => {
          return (
            <div
              className="event-card"
              key={index}
              onClick={() => navigate(`/event-details?eventId=${event.id}`)}
            >
              <img src={event.imageUrl} alt="" />
              <div className="event-card-overlay">
                <p className="uppercase bg-[#060a0f] text-white w-full text-center">{event.eventTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SingleEventCard;
