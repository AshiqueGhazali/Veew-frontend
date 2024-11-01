import React from 'react'
import './EventCard.css'
import IEvents from '../../../interface/EventsInterface';



interface eventCardProps {
  category : string;
  events : IEvents[] | null;
}

const EventCard:React.FC<eventCardProps> = ({category,events}) => {

  const filteredEvents = events?.filter((event) => {
    return (
      event.category===category 
    );
  });


  return (
    <>
    <div className='home-titleCards'>
        <h2>{category}</h2>
        <div className="card-list">
          {filteredEvents?.map((event,ind)=>{
            return (
              <div className='card' key={ind}>
                  <img src={event.imageUrl} alt="" />
                  <div className='home-card-overlay'>
                  <p>{event.eventTitle}</p>
                  </div>
              </div>
            )
          }) 
        }
        </div>
    </div>
    </>
  )
}

export default EventCard
