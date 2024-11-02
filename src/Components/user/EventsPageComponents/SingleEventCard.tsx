import React, { useState } from 'react'
import IEvents from '../../../interface/EventsInterface';
import { useNavigate } from 'react-router-dom';

interface eventCardProps {
    category : string;
    events : IEvents[] | null;
}

const SingleEventCard:React.FC<eventCardProps> = ({events,category}) => {
    const [evetDetails , setEventDetails] = useState<IEvents | null>(null)

    const navigate = useNavigate()
    const dateSetUp = (date:string)=>{
        const newDate = new Date(date)
        return newDate.toLocaleDateString()
    }

    const filterdEvents = events?.filter((event)=>{
        return (
            category ? event.category === category : event 
        )
    })

  return (
    <>
    <div className='grid grid-cols-1 m-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center'>
     {filterdEvents?.map((event)=>{
        return (
            <div className="relative m-0 flex w-full max-w-xs flex-col overflow-hidden rounded-md border border-gray-100 bg-white shadow-md">
                <a className="relative mx-3 mt-3 flex  overflow-hidden  h-[135px] " href="#">
                    <img className="object-cover h-[135px] w-[440px]" src={event.imageUrl} alt="product image" />
                    <span className="absolute top-0 left-0 m-2  bg-[#937e54] px-2 text-center text-sm font-medium text-white">{event.category}</span>
                </a>
                <div className="mt-4 px-5 pb-5">
                    <a href="#" className='no-underline'>
                    <h5 className="text-lg font-medium tracking-tight text-slate-900">{event.eventTitle}</h5>
                    </a>
                    <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                        <span className="text-2xl font-bold text-slate-900 text-[#000000]">{event.ticketPrice > 0 ? `₹ ${event.ticketPrice}` : 'FREE'}</span>
                    </p>
                    <div className="flex flex-col items-center">
                        <p className='text-customPurple text-sm'>{dateSetUp(event.date)}</p>
                        <p className='text-customPurple text-sm'>10:30 AM</p>
                    </div>
                    </div>
                    <a onClick={()=>navigate(`/event-details?eventId=${event.id}`)} className="flex items-center justify-center no-underline rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                    VIEW DETAILS</a>
                </div>
            </div>
        )
     })}
     </div>
    </>

  )
}

export default SingleEventCard