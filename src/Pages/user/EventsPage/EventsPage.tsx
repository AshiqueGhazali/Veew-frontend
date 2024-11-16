import React, { useEffect, useState } from 'react'
import './EventsPage.css'
import UserNavbar from '../../../Components/user/UserNavbar/UserNavbar'
import Footer from '../../../Components/user/Footer/Footer'
import SingleEventCard from '../../../Components/user/EventsPageComponents/SingleEventCard'
import IEvents from "../../../interface/EventsInterface";
import { getAllCategories, getUpcomingEvents } from "../../../api/user";
import "flowbite";
import { Datepicker } from 'flowbite';




const EventsPage:React.FC = () => {
  const [events,setEvents] = useState<IEvents[]|null>(null)
  const [categories , setCategories] = useState<string[]>()

  useEffect(() => {            
    const getAllEventDetails = async()=>{
      try {
        const response = await getUpcomingEvents()

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
          console.log(categories);
          
        }
      } catch (error) {
        console.log(error);
      }
    }
      getAllEventDetails()
      getCategories()

      if (typeof window !== 'undefined') {
        const datepicker = document.getElementById('datepicker-inline');
        if (datepicker) {
          new Datepicker(datepicker); 
        }
      }
  }, []);
  return (
    <>
        <UserNavbar/>
        <div className='events-page'>
          <div className='event-hero'>  
            <div className='event-hero-head'>
              <h1>Ready for Something New?<br />
              Start Searching!</h1> 
              <div className="hero-search-btn">
              <input type="search" className="search-input" placeholder="search..."/>
              <button className="btn search-btn">Search</button>
            </div>
            </div> 
          </div>
          <div className='grid grid-cols-1 md:grid-cols-10 gap-4'>
            <div className='col-span-1 md:col-span-7 p-4'>
              <SingleEventCard events={events} category={''}/>
            </div>
            <div className='col-span-1 md:col-span-3  p-4 justify-items-center'>
            <div id="datepicker-inline" inline-datepicker data-date="16/11/2024"></div>
            </div>
          </div>
          <Footer theme='light'/>
        </div>
    </>
    
  )
}

export default EventsPage