import { FaCalendarAlt } from 'react-icons/fa';
import { MdAirplay } from 'react-icons/md';
import { IoTicketSharp, IoTimerOutline } from 'react-icons/io5';

interface Feature {
  icon: React.ElementType;  
  title: string;
  description: string;
}

export const featuresData: Feature[] = [
  { icon: FaCalendarAlt, title: "Easy Event Creation", description: "Effortlessly create, manage, and customize events." },
  { icon: MdAirplay, title: "Live Streaming", description: "Stream events with interactive Q&A and chat." },
  { icon: IoTicketSharp, title: "Prebook Tickets", description: "Secure your seat in advance for upcoming events." },
  { icon: IoTimerOutline, title: "Real-Time Updates", description: "Instant notifications and schedule updates." }
];
