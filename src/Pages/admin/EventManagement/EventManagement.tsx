import React, { useState } from 'react'
import './EventManagement.css'
import EventCard from '../../../Components/admin/EventCard/EventCard';

interface eventMangmntProps {
    search: string;
}

const EventManagement:React.FC<eventMangmntProps> = ({search}) => {
    const [eventStatus, setEventStatus] = useState<"EXPIRED" | "UPCOMING">("UPCOMING");

    const activePlan = (str: string) => {
        return eventStatus === str ? "active" : "";
      };
  return (
    <div>
        <div className="eventhandle-btn">
          <div className="oprion-btn">
            <button
              className={activePlan("UPCOMING")}
              onClick={() => setEventStatus("UPCOMING")}
            >
              Upcoming
            </button>
            <button
              className={activePlan("EXPIRED")}
              onClick={() => setEventStatus("EXPIRED")}
            >
              Expired
            </button>
          </div>
        </div>

        <div className='all-e-card'>
            <EventCard/>
            <EventCard/>
            <EventCard/>
        </div>
    </div>
  )
}

export default EventManagement