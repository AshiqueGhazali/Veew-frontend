import React, { useEffect } from "react";
import { ITickets } from "../../../interface/ticketInterface";
import IEvents from "../../../interface/EventsInterface";

interface ticketListProps {
  tickets: ITickets[] | null;
  event: IEvents;
}

const TicketList: React.FC<ticketListProps> = ({ tickets, event }) => {
  

  const getDate = (date:string)=>{
    return new Date(date).toDateString()
  }

  if (!tickets || tickets.length === 0) {
    return (
      <div className="py-5">
        <p className="text-black">Tickets Not found</p>
      </div>
    );
  }

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-100">
        {tickets?.map((ticket, index) => (
          <li key={index} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              {ticket.ticketOwner.image ? (
                <img
                  alt=""
                  src={ticket.ticketOwner.image}
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                />
              ) : (
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg
                    className="absolute w-12 h-12 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              )}
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900">{`${ticket.ticketOwner.firstName} ${ticket.ticketOwner.lastName}`}</p>
                <p className="mt-1 truncate text-xs/5 text-gray-500">
                  {ticket.ticketOwner.email}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-medium font-semibold text-gray-900">{ticket.ticketCode}</p>
              {ticket.isCancelled ? (
                <>
                  <p className="mt-1 text-xs text-red-500">
                    TICKET CANCELLED
                  </p>
                </>
              ) : (
                <>
                  {!event.isCancelled ? (
                    <p className="mt-1 text-xs text-gray-500">
                      event Date :{" "}
                      <time dateTime={ticket.ticketCode}>{getDate(event.date)}</time>
                    </p>
                  ) : (
                    <p className="mt-1 text-xs text-red-500">
                      EVENT CANCELLED
                    </p>
                  )}
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
