import React, { useEffect, useState } from 'react'
import EventListAccordion from '../../../Components/admin/TicketManagementComponents/EventListAccordion'
import IEvents from '../../../interface/EventsInterface'
import { getAllEvents, getAllTickets } from '../../../api/admin'
import { ITickets } from '../../../interface/ticketInterface'

interface ticketManagementProp {
  searchQuery:string
}
const TicketManagement:React.FC<ticketManagementProp> = ({searchQuery}) => {
    const [events,setEvents] = useState<IEvents[]|null>(null)
    const [tickets , setTickets] = useState<ITickets[] | null>(null)
    const [eventStatus, setEventStatus] = useState<"EXPIRED" | "UPCOMING">("UPCOMING");


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

        const getAllTicketDetails = async()=>{
            try {
              const response = await getAllTickets()
      
              if(response.status === 200){
                setTickets(response.data) 
              }
            } catch (error) {
              console.log("somthing went wronggg");
              
            }
          }

          getAllEventDetails()
          getAllTicketDetails()
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
        <EventListAccordion events={events} tickets={tickets} eventStatus={eventStatus} searchQuery={searchQuery}/>
    </div>
  )
}

export default TicketManagement