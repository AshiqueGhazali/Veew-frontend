import React, { useEffect, useState } from "react";
import { ITickets } from "../../../interface/ticketInterface";
import { cancellTicket, getAllUserTickets } from "../../../api/user";
import { listTypeEnum } from "../UserProfile/UserProfile";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ticketsProps {
  eventStatus: listTypeEnum;
}

const UserTickets: React.FC<ticketsProps> = ({ eventStatus }) => {
  const [userTickets, setUserTickets] = useState<ITickets[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ticketsPerPage] = useState<number>(10);
  const navigate = useNavigate();

  useEffect(() => {
    const getTickets = async () => {
      try {
        const response = await getAllUserTickets();

        if (response.status === 200) {
          setUserTickets(response.data);
        }
      } catch (error) {
        console.log("afdfsfds");
      }
    };

    getTickets();
  }, []);

  const handleEventCancellation = async (ticketId: string) => {
    try {
      const response = await cancellTicket(ticketId);

      if (response.status === 200) {
        toast.success("Ticket Cancelled!");
      }
    } catch (error: any) {
      if (error.response.status === 400 || error.response.status === 401) {
        toast.error(error.response.data);
      }
      console.log(error);
    }
  };

  const parseEventDateTime = (date: string, endTime: string): Date => {
    const eventDate = new Date(date);
    const [hours, minutes] = endTime.split(":").map(Number);
    eventDate.setHours(hours, minutes);
    return eventDate;
  };

  const filterdTickets = userTickets?.filter((ticket) => {
    const eventDateTime = parseEventDateTime(
      ticket.eventDetails.date,
      ticket.eventDetails.endTime
    );
    const currentDate = new Date();

    const isUpcoming = eventDateTime >= currentDate;
    const matchesStatus = eventStatus === "UPCOMING" ? isUpcoming : !isUpcoming;

    return matchesStatus;
  });

  const totalTickets = filterdTickets?.length || 0;
  const totalPages = Math.ceil(totalTickets / ticketsPerPage);
  const startIndex = (currentPage - 1) * ticketsPerPage;
  const endIndex = startIndex + ticketsPerPage;
  const paginatedTickets = filterdTickets?.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  let listCount = 0;
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Ticket Code
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Event Date
              </th>
              <th scope="col" className="px-6 py-3">
                status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {!filterdTickets ||
              (filterdTickets.length === 0 && (
                <p className="text-center text-black">tickets not found</p>
              ))}
            {filterdTickets?.map((ticket, index) => {
              listCount += 1;
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={index}
                >
                  <th
                    scope="row"
                    onDoubleClick={() =>
                      navigate(
                        `/event-details?eventId=${ticket.eventDetails.id}`
                      )
                    }
                    className="px-6 py-4 font-medium whitespace-nowrap text-white"
                  >
                    {/* <p id="copy-button">{ticket.ticketCode}</p> */}
                    <div className="w-full max-w-[16rem]">
                      <div className="relative">
                        <input
                          id="npm-install-copy-button"
                          type="text"
                          className="col-span-6  border border-black  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  bg-black text-white"
                          value={ticket.ticketCode}
                          disabled
                          readOnly
                        />
                        <button
                          data-copy-to-clipboard-target="npm-install-copy-button"
                          data-tooltip-target="tooltip-copy-npm-install-copy-button"
                          className="absolute end-2 top-1/2 -translate-y-1/2 text-whit dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center"
                        >
                          <span id="default-icon">
                            <svg
                              className="w-3.5 h-3.5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 18 20"
                            >
                              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                            </svg>
                          </span>
                          <span
                            id="success-icon"
                            className="hidden inline-flex items-center"
                          >
                            <svg
                              className="w-3.5 h-3.5 text-blue-700 dark:text-blue-500"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 16 12"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 5.917 5.724 10.5 15 1.5"
                              />
                            </svg>
                          </span>
                        </button>
                        <div
                          id="tooltip-copy-npm-install-copy-button"
                          role="tooltip"
                          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                        >
                          <span id="default-tooltip-message">
                            Copy to clipboard
                          </span>
                          <span id="success-tooltip-message" className="hidden">
                            Copied!
                          </span>
                          <div
                            className="tooltip-arrow"
                            data-popper-arrow
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* dasfsfas */}
                  </th>
                  <td className="px-6 py-4">₹ {ticket.amount}</td>
                  <td className="px-6 py-4">
                    {getDate(ticket.eventDetails.date)}
                  </td>
                  <td className="px-6 py-4 text-black">
                    {ticket.isCancelled
                      ? "Ticket Cancelled"
                      : ticket.eventDetails.isCancelled
                      ? "Event Cancelled"
                      : eventStatus === listTypeEnum.EXPIRED
                      ? "Event Finished "
                      : "Active"}
                  </td>
                  <td className="px-6 py-4">
                    {!ticket.isCancelled &&
                    eventStatus === listTypeEnum.UPCOMING ? (
                      <button
                        type="button"
                        onClick={() => handleEventCancellation(ticket.id)}
                        className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                      >
                        Cancel
                      </button>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav
          className="flex p-5 items-center flex-column flex-wrap md:flex-row justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-900 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{" "}
            <span className="font-semibold text-gray-900">1-{listCount}</span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">
              {filterdTickets?.length}
            </span>
          </span>
          <div>
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="text-gray-500 bg-white border border-gray-300 rounded-l-lg px-3 py-1"
            >
              Previous
            </button>
            <span className="text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="text-gray-500 bg-white border border-gray-300 rounded-r-lg px-3 py-1"
            >
              Next
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default UserTickets;
