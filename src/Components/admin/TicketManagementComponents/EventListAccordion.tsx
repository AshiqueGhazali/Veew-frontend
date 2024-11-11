import React, { useState } from "react";
import TicketList from "./TicketList";
import IEvents from "../../../interface/EventsInterface";
import { ITickets } from "../../../interface/ticketInterface";

interface eventListProps {
  events: IEvents[] | null;
  tickets: ITickets[] | null;
  eventStatus:"EXPIRED" | "UPCOMING";
  searchQuery:string
}

const EventListAccordion: React.FC<eventListProps> = ({ events, tickets , eventStatus , searchQuery}) => {
  const [openPanel, setOpenPanel] = useState<number | null>(1);

  const togglePanel = (panelIndex: number) => {
    setOpenPanel(openPanel === panelIndex ? null : panelIndex);
  };

  const parseEventDateTime = (date: string, endTime: string): Date => {
    const eventDate = new Date(date);
    const [hours, minutes] = endTime.split(':').map(Number);
    eventDate.setHours(hours, minutes);
    return eventDate;
  };


  const filteredEvents = events?.filter((event) => {
    const eventDateTime = parseEventDateTime(event.date, event.endTime);
    const currentDate = new Date();

    const isUpcoming = eventDateTime >= currentDate;
    const matchesStatus = eventStatus === 'UPCOMING' ? isUpcoming : !isUpcoming;
    return (
      event.eventTitle.toLowerCase().includes(searchQuery.toLowerCase())  &&
      matchesStatus
    );
  });


  return (
    <>
      <div
        id="accordion-flush"
        data-accordion="collapse"
        className={` ${
          openPanel
            ? "bg-white dark:bg-gray-200 text-gray-900 dark:text-white"
            : "text-gray-500 dark:text-gray-400"
        } `}
      >
        {filteredEvents?.map((event, index) => {
          return (
            <div key={index}>
              <h2 id="accordion-flush-heading-1 mb-10" className="">
                <button
                  type="button"
                  className="flex items-center justify-between w-full p-5 font-semibold text-normal  rtl:text-right border-b-[10px] border-red-500  gap-3"
                  aria-expanded={openPanel === index + 1}
                  onClick={() => togglePanel(index + 1)}
                >
                  <span className="font-semibold text-normal">
                    {event.eventTitle}
                  </span>
                  <svg
                    className={`w-3 h-3 ${
                      openPanel !== index + 1 ? "rotate-180" : ""
                    } shrink-0`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </button>
              </h2>
              <div
                id="accordion-flush-body-1"
                className={`${openPanel === index + 1 ? "px-5" : "hidden"}`}
                aria-labelledby="accordion-flush-heading-1"
              >
                {
                  <TicketList
                    key={index}
                    event={event}
                    tickets={tickets && tickets?.filter((ticket) => {
                      return ticket.eventId === event.id;
                    })}
                  />
                }
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EventListAccordion;
