import UserNavbar from "../../../Components/user/UserNavbar/UserNavbar";
import "./Home.css";
import Banner from "../../../assets/hero-banner.jpg";
import Footer from "../../../Components/user/Footer/Footer";
import { useEffect, useState } from "react";
import IEvents from "../../../interface/EventsInterface";
import { getAllCategories, getUpcomingEvents } from "../../../api/user";
import HomeEvents from "../../../Components/user/HomeEvents/HomeEvents";
import StatsSection from "../../../Components/user/StatusSection/StatusSection";

const Home = () => {
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
      <img src={Banner} alt="" className="hero-banner" />
      <UserNavbar />
      <div className="user-home">
        <div className="home-hero">
          <div className="hero-caption">
            <h1>
              Ready for Something New?
              <br />
              Start Searching!
            </h1>
            <p>Find the right plan to fuel your growth</p>
            <div className="hero-search-btn">
              <input type="search" className="search-input" placeholder="search..."/>
              <button className="btn search-btn">Search</button>
            </div>
          </div>
        </div>
        <StatsSection/>
        <div className="event-card-home">
          {
            categories?.map((category)=>{
              return (
                <HomeEvents category={category} events={events} key={category}/>
              )
            })
          }
        </div>

        <Footer theme="light"/>
      </div>
    </>
  );
};

export default Home;
