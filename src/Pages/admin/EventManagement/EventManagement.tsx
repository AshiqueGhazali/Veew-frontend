import React, { useEffect, useState } from 'react'
import './EventManagement.css'
import EventCard from '../../../Components/admin/EventCard/EventCard';
import { getAllCategories, getAllEvents } from '../../../api/admin';
import IEvents from '../../../interface/EventsInterface';

interface eventMangmntProps {
    search: string;
}

const EventManagement:React.FC<eventMangmntProps> = ({search}) => {
    const [eventStatus, setEventStatus] = useState<"EXPIRED" | "UPCOMING">("UPCOMING");
    const [events,setEvents] = useState<IEvents[]|null>(null)
    const [categories , setCategories] = useState<string[]>()

    useEffect(() => {            
      const getAllEventDetails = async()=>{
        try {
          const response = await getAllEvents()
  
          if(response.status === 200){
            setEvents(response.data) 
          }
        } catch (error) {
          console.log("somthing went wronggg");
          
        }
      }

      const getCategories = async()=>{
        try {
          const response = await getAllCategories()          

          if(response.status===200){            
            setCategories(response.data)
          }
        } catch (error) {
          console.log(error);
        }
      }
        getAllEventDetails()
        getCategories()
    }, []);

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

        <div className='all-event-card'> 
            {categories && categories.length > 0 ? (
              categories?.map((category, index)=>{
                return (
                  <EventCard category={category} events={events} searchQuery={search} eventStatus={eventStatus} key={index}/>
                )
              })
            ) :
            (
              <><h1>ooopss Events not found</h1></>
            )} 
        </div>
    </div>
  )
}

export default EventManagement