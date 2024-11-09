import React, { useState } from 'react'
import './EventCard.css'
import EventDetailModal from '../EventDetailsModal/EventDetailModal';
import IEvents from '../../../interface/EventsInterface';



interface eventCardProps {
  category : string;
  events : IEvents[] | null;
  searchQuery : string;
  eventStatus:"EXPIRED" | "UPCOMING"
}

const EventCard:React.FC<eventCardProps> = ({category,events, searchQuery,eventStatus}) => {
  const [isOpen , setOpen] = useState<boolean>(false)
  const [eventDetail, setEvent] = useState<IEvents|null>(null)

  const eventDetailsShow = (value:IEvents)=>{
    setEvent(value)
    setOpen(true)
  }

  const parseEventDateTime = (date: string, endTime: string): Date => {
    const eventDate = new Date(date);
    const [hours, minutes] = endTime.split(':').map(Number);
    eventDate.setHours(hours, minutes);
    return eventDate;
  };


  const filteredEvents = events?.filter((event) => {
    const eventDateTime = parseEventDateTime(event.date, event.endTime);
    const currentDate = new Date();

    const isUpcoming = eventDateTime >= currentDate;
    const matchesStatus = eventStatus === 'UPCOMING' ? isUpcoming : !isUpcoming;
    return (
      event.category===category &&
      event.eventTitle.toLowerCase().includes(searchQuery.toLowerCase())  &&
      matchesStatus
    );
  });

  if(!filteredEvents?.length){
    return null
  }


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




// const setEventsByStatus  = (eventStatus:"EXPIRED" | "UPCOMING",date:string,endTime:string)=>{
//   const currentDate = new Date();
//       const eventDate = new Date(date);
      // const eventDateOnly = eventDate.toDateString();
      // const currentDateOnly = currentDate.toDateString();

      // if (eventDate < currentDate && eventDateOnly !== currentDateOnly) {
      //   return {
      //     status: false,
      //     message: "Can't Cancel past events!",
      //   };
      // }

      // if

      // const startDateTime = new Date(
      //   `${eventDate}T${startTime}`
      // );
      // const endDateTime = new Date(
      //   `${eventDate}T${endTime}`
      // );

      // if (eventDateOnly === currentDateOnly) {
      //   const currentTime =
      //     currentDate.getHours() * 60 + currentDate.getMinutes();
      //   const startMinutes =
      //     startDateTime.getHours() * 60 + startDateTime.getMinutes();
      //   const endMinutes =
      //     endDateTime.getHours() * 60 + endDateTime.getMinutes();

      //   if (startMinutes < currentTime || endMinutes < currentTime) {
      //     return {
      //       status: false,
      //       message: "The Event Time is finished",
      //     };
      //   }
      // }
// }