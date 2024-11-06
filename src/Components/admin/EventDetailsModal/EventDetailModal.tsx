import React from "react";
import "./EventDetailsModal.css";
import IEvents from "../../../interface/EventsInterface";
import { toast } from "react-toastify";
import { adminCancelEvent } from "../../../api/admin";

interface EventDetailsProp {
  onClose: () => void;
  event: IEvents | null;
}
const EventDetailModal: React.FC<EventDetailsProp> = ({ onClose, event }) => {
  if (!event) {
    return null;
  }

  const date = new Date(event.date);

  const handleCancellEvent = async (eventId: string) => {
    try {
      const response = await adminCancelEvent(eventId);

      if (response.status === 200) {
        toast.success("Event Cancelled!");
      }
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  };
  return (
    <div className="modal-overlay">
      <div className="eventDetails-modal">
        <div className="modal-header">
          <h3>{event.eventTitle}</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="eventDetails-modal-body">
          <img src={event.imageUrl} alt="" />
          <div className="body-text">
            <p>{event.description}</p>
            <div className="event-details-text">
              <p>
                <span>Hosts</span> :{" "}
                {`${event.user.firstName} ${event.user.lastName}`}
              </p>
              <p>
                <span>Category</span> : {event.category}
              </p>
              <p>
                <span>Ticket</span> :{" "}
                {event.ticketPrice > 0 ? event.ticketPrice : "FREE"}
              </p>
            </div>
            <div className="event-details-text">
              <p>
                <span>Date</span> : {date.toLocaleDateString()}
              </p>
              <p>
                <span>Time</span> : {event.startTime} to {event.endTime}
              </p>
            </div>
            <div className="event-details-text">
              <p>
                <span>Participate Count</span> : {event.participantCount}
              </p>
              <p>
                <span>Boocked seats</span> : 20
              </p>
              <p>
                <span>Availble seats</span> : 130
              </p>
            </div>
          </div>
        </div>
        <div className="eventDetails-modal-footer">
          {event.isCancelled ? (
            <div className="bg-red-500 w-full py-2 cursor-pointer">
              <p className="text-center text-white">EVENT CANCELLED</p>
            </div>
          ) : (
            <button onClick={() => handleCancellEvent(event.id)}>
              Cancel Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;
