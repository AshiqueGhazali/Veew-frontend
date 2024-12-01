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

  const handleEventCancellation = async(ticketId:string)=>{
    try {
        const response = await cancellTicket(ticketId)

        if(response.status===200){
            toast.success("Ticket Cancelled!")
        }
    } catch (error:any) {
        if(error.response.status === 400 || error.response.status === 401){
            toast.error(error.response.data)
        }
        console.log(error);
        
    }
  }

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
                    {ticket.ticketCode}
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
                    {!ticket.isCancelled && eventStatus===listTypeEnum.UPCOMING ?
                    <button
                      type="button"
                      onClick={()=>handleEventCancellation(ticket.id)}
                      className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    >
                      Cancel
                    </button> : <></>
                    }
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
