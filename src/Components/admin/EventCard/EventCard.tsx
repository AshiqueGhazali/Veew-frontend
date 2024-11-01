import React, { useState } from 'react'
import './EventCard.css'
import EventDetailModal from '../EventDetailsModal/EventDetailModal';
import IEvents from '../../../interface/EventsInterface';



interface eventCardProps {
  category : string;
  events : IEvents[] | null;
  searchQuery : string
}

const EventCard:React.FC<eventCardProps> = ({category,events, searchQuery}) => {
  const [isOpen , setOpen] = useState<boolean>(false)
  const [eventDetail, setEvent] = useState<IEvents|null>(null)

  const eventDetailsShow = (value:IEvents)=>{
    setEvent(value)
    setOpen(true)
  }

  const filteredEvents = events?.filter((event) => {
    return (
      event.category===category &&
      event.eventTitle.toLowerCase().includes(searchQuery.toLowerCase())   
    );
  });


  return (
    <>
    <div className='titleCards'>
        <h2>{category}</h2>
        <div className="card-list">
          {filteredEvents?.map((event,ind)=>{
            return (
              <div className='card' onClick={()=>eventDetailsShow(event)}  key={ind}>
                  <img src={event.imageUrl} alt="" />
                  <div className='overlay'>
                  <p>{event.eventTitle}</p>
                  </div>
              </div>
            )
          }) 
        }
        </div>
    </div>
    {isOpen && <EventDetailModal onClose={()=>setOpen(false)} event={eventDetail}/>}
    </>
  )
}

export default EventCard

// filter((event)=>{
//   return (
//     event.category===category &&
//     event.eventTitle.toLowerCase().includes(searchQuery.toLowerCase())              )
// })