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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [eventsPerPage] = useState(5);

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

  const totalEvents = filteredEvents?.length || 0
  const totalPages = Math.ceil(totalEvents/eventsPerPage)
  const startIndex = (currentPage-1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const paginatedEvents = filteredEvents?.slice(startIndex,endIndex)

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
        {paginatedEvents?.map((event, index) => {
          return (
            <div key={index}>
              <h2 id="accordion-flush-heading-1 mb-10" className="">
                <button
                  type="button"
                  className="flex items-center justify-between w-full p-5 font-semibold text-normal py-6 border border-b-2 border-black rtl:text-right  gap-3"
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
      <div className="flex flex-col items-center mt-6">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">{startIndex}</span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {endIndex < totalEvents ? endIndex : totalEvents}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {totalEvents}
          </span>{" "}
          Events
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button onClick={()=>handlePageChange(currentPage - 1)} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Prev
          </button>
          <button onClick={()=>handlePageChange(currentPage + 1)} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default EventListAccordion;
