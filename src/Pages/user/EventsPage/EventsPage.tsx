import React, { useEffect, useState } from 'react'
import './EventsPage.css'
import UserNavbar from '../../../Components/user/UserNavbar/UserNavbar'
import Footer from '../../../Components/user/Footer/Footer'
import SingleEventCard from '../../../Components/user/EventsPageComponents/SingleEventCard'
import IEvents from "../../../interface/EventsInterface";
import { getAllCategories, getUpcomingEvents } from "../../../api/user";


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
        }
      } catch (error) {
        console.log(error);
      }
    }
      getAllEventDetails()
      getCategories()
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
          <div>
            <SingleEventCard events={events} category={''}/>
          </div>
          <Footer theme='light'/>
        </div>
    </>
    
  )
}

export default EventsPage