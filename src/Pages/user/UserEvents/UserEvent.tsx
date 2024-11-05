import React, { useEffect, useState } from "react";
import UserProfileEventCard from "../../../Components/user/UserProfileEvents/UserProfileEventCard";
import { getHostedEvents } from "../../../api/user";
import IEvents from "../../../interface/EventsInterface";

const UserEvent: React.FC = () => {
  const [events, setEvents] = useState<IEvents[] | null>(null);
  const [isEditDetailsModal, setIsEditDetailsModal] = useState<boolean>(false);
  const [isDateEditModalOpen, setDateEditModalOpen] = useState<boolean>(false);

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

  return (
    <>
      {events && events?.length > 0 ? (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {events?.map((event, index) => (
            <UserProfileEventCard
              eventData={event}
              key={index}
              isEditDetailsModal={isEditDetailsModal}
              setIsEditDetailsModal={setIsEditDetailsModal}
              isDateEditModalOpen = {isDateEditModalOpen}
              setDateEditModalOpen = {setDateEditModalOpen}
            />
          ))}
        </div>
      ) : (
        <h1>You did't host events yet?</h1>
      )}
    </>
  );
};

export default UserEvent;
