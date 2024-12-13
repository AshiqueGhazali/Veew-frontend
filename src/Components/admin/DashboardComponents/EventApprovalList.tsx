import React, { useEffect, useState } from "react";
import ILiveStatus from "../../../interface/liveStatusInterface";
import { approveFund, getAdminEventApprovals } from "../../../api/admin";
import { IApprovalStatus } from "../../../Pages/admin/Dashboard/Dashboard";
import { toast } from "react-toastify";

interface IEventsQue {
  approvalStatus: IApprovalStatus;
}

const EventApprovalList: React.FC<IEventsQue> = ({ approvalStatus }) => {
  const [approvalQueue, setApprovalQueue] = useState<ILiveStatus[] | null>(null);
  const [change , setChange] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [eventsPerPage] = useState(10);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await getAdminEventApprovals();
        if (response.status === 200) {
          setApprovalQueue(response.data);
        }
      } catch (error) {
        console.log("afdsfafeeefdasdsfdsfdsf", error);
      }
    };

    getEvents();
  }, [change]);

  const fitlerdEvents = approvalQueue?.filter((event) => {
    return (
      event.approvedAmount &&
      event.approvedAmount > 0 &&
      (approvalStatus === IApprovalStatus.PENDING
        ? event.isApproved === false
        : event.isApproved === true)
    );
  });

  const handleApproveFund = async (eventId: string) => {
    try {
      const response = await approveFund(eventId);

      if (response.status === 200) {
        toast.success("Approved Successfully!");
        setChange(change+1)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const totalEvents = fitlerdEvents?.length || 0;
  const totalPages = Math.ceil(totalEvents/eventsPerPage)
  const startIndex = (currentPage-1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const paginatedEvents = fitlerdEvents?.slice(startIndex,endIndex)
  
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  return (
    <>
      {paginatedEvents && paginatedEvents.length > 0 ? (
        <div className="table-auto mt-6">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  EVENT NAME
                </th>
                <th scope="col" className="px-6 py-3">
                  DATE
                </th>
                <th scope="col" className="px-6 py-3">
                  amount
                </th>
                <th scope="col" className="px-6 py-3">
                  joineers
                </th>
                <th scope="col" className="px-6 py-3">
                  approve
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedEvents.map((event, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 bg-white whitespace-nowrap dark:text-white"
                    >
                      {event.liveEvent.eventTitle}
                    </th>
                    <td>{new Date(event.liveEvent.date).toDateString()}</td>
                    <td>{event.approvedAmount}</td>
                    <td>
                      {event.approvedAmount &&
                        event?.approvedAmount / event.liveEvent.ticketPrice}
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 bg-white whitespace-nowrap dark:text-white"
                    >
                      {approvalStatus===IApprovalStatus.APPROVED ? <><p className="cursor-pointer"><strong>APPROVED</strong></p></> :
                      <button
                        type="button"
                        onClick={()=>handleApproveFund(event.eventId)}
                        className="text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                      >
                        Approve
                      </button>
                      }
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex flex-col items-center mt-4">
            <span className="text-sm text-gray-700 dark:text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {startIndex}
              </span>{" "}
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
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Prev
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center">
            <h3>
              {approvalStatus === IApprovalStatus.PENDING
                ? "No Events For Approval"
                : "No Approved Events"}
            </h3>
          </div>
        </>
      )}
    </>
  );
};

export default EventApprovalList;
