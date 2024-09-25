import './FeaturesCard.css'
import { ReactElement } from 'react';
import { FaCalendarAlt } from "react-icons/fa";
import { MdAirplay } from "react-icons/md";
import { IoTicketSharp } from "react-icons/io5";
import { IoTimerOutline } from "react-icons/io5";


interface Feature {
    title: string;
    description: string;
    icon: ReactElement; // ReactElement type for the icon
  }


const FeatursCard = () => {
    const features: Feature[] = [
        {
            title:"Easy Event Creation",
            description:"Effortlessly create, manage, and customize events.",
            icon:<FaCalendarAlt className="icon"/>
        },
        {
            title:"Live Streaming",
            description:"Stream events with interactive Q&A and chat.",
            icon:<MdAirplay className="icon"/>
        },
        {
            title:"Prebook Tickets",
            description:"Secure your seat in advance for upcoming events.",
            icon:<IoTicketSharp className="icon"/>
        },
        {
            title:"Real-Time Updates",
            description:"Instant notifications and schedule updates.",
            icon:<IoTimerOutline  className="icon"/>
        }
    ]
  return (
    <div className='feature-section'>
        {features.map((values,index)=>(
            <div className='feature-card' key={index}>
                {values.icon}
                <h5>{values.title}</h5>
                <p className='feature-description'>{values.description}</p>
          </div>
        ))}
    </div>
  )
}

export default FeatursCard