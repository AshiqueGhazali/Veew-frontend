import React, { useEffect, useState } from "react";
import { ITickets } from "../../../interface/ticketInterface";
import IEvents from "../../../interface/EventsInterface";
import { getAllTicketForEvent } from "../../../api/user";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  event:IEvents,
  ticketData : ITickets[] | null
}
const EventTicketsModal: React.FC<ModalProps> = ({isOpen,setIsOpen,event,ticketData }) => {
  if (!isOpen) {
    return null;
  }

  



  const getDate = (date:string)=>{
    return new Date(date).toDateString()
  }

  return (
    <div
      id="authentication-modal"
      aria-hidden={!isOpen}
      className="fixed top-0 border-b border-b-[1px] border-b-black right-0 left-0 z-50 flex justify-center items-center w-full h-full md:inset-0 bg-gray-900 bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white  rounded-lg shadow ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold">Tickets</h3>
            <button
              type="button"
              onClick={setIsOpen}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-4 md:p-5">
            <div className="space-y-4">
              <div>
                <ul role="list" className="divide-y divide-gray-100">
                  {ticketData?.map((ticket, index) => (
                    <li
                      key={index}
                      className="flex justify-between gap-x-6 py-5"
                    >
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
                        <p className="text-medium font-semibold text-gray-900">
                          {ticket.ticketCode}
                        </p>
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
                                <time dateTime={ticket.ticketCode}>
                                  {getDate(event.date)}
                                </time>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTicketsModal;
