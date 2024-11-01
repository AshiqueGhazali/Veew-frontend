import React from 'react'
import './EventDetailsModal.css'
import IEvents from '../../../interface/EventsInterface'


interface EventDetailsProp {
    onClose:()=>void
    event:IEvents|null
}
const EventDetailModal:React.FC<EventDetailsProp> = ({onClose,event}) => {

  if(!event){
    return null
  }

  const date = new Date(event.date)
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
          <div className='body-text'>
            <p>{event.description}</p>
            <div className='event-details-text'>
                <p><span>Hosts</span> : {`${event.user.firstName} ${event.user.lastName}`}</p>
                <p><span>Category</span> : {event.category}</p>
                <p><span>Ticket</span> : {event.ticketPrice > 0 ? event.ticketPrice : 'FREE'}</p>
            </div>
            <div className='event-details-text'>
                <p><span>Date</span> : {date.toLocaleDateString()}</p>
                <p><span>Time</span> : {event.startTime} to {event.endTime}</p>
            </div>
            <div className='event-details-text'>
                <p><span>Participate Count</span> : {event.participantCount}</p>
                <p><span>Boocked seats</span> : 20</p>
                <p><span>Availble seats</span> : 130</p>
            </div>
          </div>
        </div>
        <div className="eventDetails-modal-footer">
          <button>Cancel Event</button>
        </div>
      </div>
    </div>
  )
}

export default EventDetailModal