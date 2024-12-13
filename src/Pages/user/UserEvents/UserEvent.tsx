import React, { useEffect, useState } from "react";
import UserProfileEventCard from "../../../Components/user/UserProfileEvents/UserProfileEventCard";
import { getHostedEvents } from "../../../api/user";
import IEvents from "../../../interface/EventsInterface";
import { listTypeEnum } from "../UserProfile/UserProfile";

interface userEventProps {
  eventStatus: listTypeEnum;
}
const UserEvent: React.FC<userEventProps> = ({ eventStatus }) => {
  const [events, setEvents] = useState<IEvents[] | null>(null);
  const [isEditDetailsModal, setIsEditDetailsModal] = useState<boolean>(false);
  const [isDateEditModalOpen, setDateEditModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [eventsPerPage] = useState(6);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await getHostedEvents();
        if (response.status === 200) {
          setEvents(response.data);
        }
      } catch (error) {
        console.log("somthing went wronggggg", error);
      }
    };

    getEvents();

    if (isDateEditModalOpen) {
      setIsEditDetailsModal(false);
    } else if (isEditDetailsModal) {
      setDateEditModalOpen(false);
    }
  }, [isEditDetailsModal]);

  const parseEventDateTime = (date: string, endTime: string): Date => {
    const eventDate = new Date(date);
    const [hours, minutes] = endTime.split(":").map(Number);
    eventDate.setHours(hours, minutes);
    return eventDate;
  };

  const fitlerdEvents = events?.filter((event) => {
    const eventDateTime = parseEventDateTime(event.date, event.endTime);
    const currentDate = new Date();

    const isUpcoming = eventDateTime >= currentDate;
    const matchesStatus = eventStatus === "UPCOMING" ? isUpcoming : !isUpcoming;

    return matchesStatus;
  });

  const totalEvents = fitlerdEvents?.length || 0;
  const totalPages = Math.ceil(totalEvents / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const paginatedEvents = fitlerdEvents?.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      {events && events?.length > 0 ? (
        <>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {paginatedEvents?.map((event, index) => (
              <UserProfileEventCard
                eventData={event}
                key={index}
                isEditDetailsModal={isEditDetailsModal}
                setIsEditDetailsModal={setIsEditDetailsModal}
                isDateEditModalOpen={isDateEditModalOpen}
                setDateEditModalOpen={setDateEditModalOpen}
              />
            ))}
          </div>
          <div className="flex flex-col items-center">
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
        </>
      ) : (
        <h1>You did't host events yet?</h1>
      )}
    </>
  );
};

export default UserEvent;
