import React, { useEffect, useState } from "react";
import IEvents from "../../../interface/EventsInterface";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import EditHostedEventDetails from "./EditHostedEventDetails";
import EditEventDateAndTime from "./EditEventDateAndTime";
import { toast } from "react-toastify";
import { cancelEvent, getAllTicketForEvent, getEventLiveUpdates } from "../../../api/user";
import EventTicketsModal from "./EventTicketsModal";
import { ITickets } from "../../../interface/ticketInterface";

interface EventCardProps {
  eventData: IEvents;
  isEditDetailsModal: boolean;
  setIsEditDetailsModal: (status: boolean) => void;
  isDateEditModalOpen: boolean;
  setDateEditModalOpen: (status: boolean) => void;
}

enum IEventStatus {
  UPCOMING='UPCOMING',
  STARTED='STARTED',
  END = 'END'
}

const UserProfileEventCard: React.FC<EventCardProps> = ({
  eventData,
  isEditDetailsModal,
  setIsEditDetailsModal,
  isDateEditModalOpen,
  setDateEditModalOpen,
}) => {
  const [isTicketModalOpen, setTicketModal] = useState<boolean>(false);
  const [ticketData , setTicket] = useState<ITickets[] | null>(null)
  const [eventStatus , setEventStatus] = useState<IEventStatus>(IEventStatus.UPCOMING)
  const [isTime , setTime] = useState<boolean>(false)

  

  const navigate = useNavigate();
  const navigateTODetailPage = (eventId: string) => {
    navigate(`/event-details?eventId=${eventId}`);
  };

  const openEditDetailModal = () => {
    setIsEditDetailsModal(true);
  };

  const openDateAndTimeEditModal = () => {
    setDateEditModalOpen(true);
  };

  const isEventTime = (date: string, startTime: string, endTime: string): boolean => {
    const eventDate = new Date(date);
    const startDate = new Date(`${eventDate.toISOString().split('T')[0]}T${startTime}`);
    const endDate = new Date(`${eventDate.toISOString().split('T')[0]}T${endTime}`);
    const currentTime = new Date();
  
    return currentTime >= startDate && currentTime < endDate;
  };

  const handleEventCancellation = async (eventId: string) => {
    try {
      const response = await cancelEvent(eventId);

      if (response.status === 200) {
        toast.success("Event Cancelled successfully!");
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        toast.error(error.response.message);
      } else {
        console.log(error);
      }
    }
  };


  useEffect(()=>{
    const getAllTickets = async()=>{
        try {
            const response = await getAllTicketForEvent(eventData.id)

            if(response.status===200){
                setTicket(response.data)
            }
        } catch (error) {
            console.log("errrrr",error);
            
        }
    }

    getAllTickets()
  },[])

  useEffect(() => {
    const getStreamUpdates = async () => {
      if (!eventData) return;
      try {
        const response = await getEventLiveUpdates(eventData?.id);

        if (response.status === 200) {
          if (response.data.startTime) {
            setEventStatus(IEventStatus.STARTED);
          }
          if (
            response.data.endTime &&
            response.data.startTime !== response.data.endTime
          ) {
            console.log("startTime", response.data.startTime);

            console.log("endddddd", response.data.endTime);

            setEventStatus(IEventStatus.END);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    const checkEventTime = () => {
      const isOngoing = isEventTime(eventData.date, eventData.startTime, eventData.endTime);
      setTime(isOngoing);
    };
  
    checkEventTime();
    

    getStreamUpdates()
  }, [eventData]);

  return (
    <>
      <div className="bg-white rounded-lg p-4 shadow-md sm:w-full">
        <div className="flex justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="text-lg font-semibold">{eventData.eventTitle}</h3>
              <p className="text-gray-500 text-sm mt-2">
                {eventData.description}
              </p>
            </div>
          </div>
          <div
            className="text-blue-500 cursor-pointer text-sm"
            onClick={() => navigateTODetailPage(eventData.id)}
          >
            view Details
          </div>
        </div>
        <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="flex flex-col items-center ">
          <button
            onClick={() => setTicketModal(true)}
            className="relative inline-flex items-center w-full justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white"
          >
            view all tickets
          </button>
        </div>
        {!eventData.isCancelled ? (
          <div className="flex items-center justify-center">
            <Menu as="div" className="relative ml-3 ">
              <MenuButton className="inline-flex items-center rounded-md bg-white px-3 py-2 mr-4 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                Edit
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 ml-1.5 h-5 w-5 text-gray-400"
                />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition  data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <div
                    onClick={openEditDetailModal}
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none cursor-pointer"
                  >
                    Edit Details
                  </div>
                </MenuItem>
                <MenuItem>
                  <div
                    onClick={openDateAndTimeEditModal}
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none cursor-pointer"
                  >
                    Edit Date & Time
                  </div>
                </MenuItem>
              </MenuItems>
            </Menu>

            <button
              type="button"
              onClick={() => handleEventCancellation(eventData.id)}
              className="text-black hover:text-white border border-black hover:bg-arkblue  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500"
            >
              CANCEL
            </button>
            {eventStatus === IEventStatus.END ? <></> : <>{
              isTime &&
              <button
              type="button"
              onClick={() => navigate(`/meet?eventId=${eventData.id}`)}
              className="text-black hover:text-white border border-black hover:bg-arkblue  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500"
            >
              START
            </button>
            }
            </>
            }
          </div>
        ) : (
          <div>
            <p className="text-red-500 text-center cursor-pointer">
              EVENT CANCELLED!
            </p>
          </div>
        )}
      </div>
      <EditHostedEventDetails
        isOpen={isEditDetailsModal}
        setIsOpen={() => setIsEditDetailsModal(false)}
        eventData={eventData}
      />
      {isDateEditModalOpen && (
        <EditEventDateAndTime
          isOpen={isDateEditModalOpen}
          onClose={() => setDateEditModalOpen(false)}
          eventData={eventData}
        />
      )}
      <EventTicketsModal
        isOpen={isTicketModalOpen}
        setIsOpen={() => setTicketModal(false)}
        event={eventData}
        ticketData={ticketData}
      />
    </>
  );
};

export default UserProfileEventCard;
