import React from 'react'
import './HomeEvents.css'
import IEvents from '../../../interface/EventsInterface';
import { useNavigate } from 'react-router-dom';



interface eventCardProps {
  category : string;
  events : IEvents[] | null;
}

const HomeEvents:React.FC<eventCardProps> = ({category,events}) => {
  const navigate = useNavigate()

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
              <div className='card' key={ind} onClick={()=>navigate(`/event-details?eventId=${event.id}`)}>
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

export default HomeEvents
