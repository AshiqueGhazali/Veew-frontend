import UserNavbar from "../../../Components/user/UserNavbar/UserNavbar";
import "./Home.css";
import Banner from "../../../assets/hero-banner.jpg";
import EventCard from "../../../Components/admin/EventCard/EventCard";
import { EventTypes } from "../../../interface/userInterface";
import Footer from "../../../Components/user/Footer/Footer";

const Home = () => {
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
        <div className="event-card-home">
          {/* <EventCard category={EventTypes.SEMINAR}/>
          <EventCard category={EventTypes.SEMINAR}/>
          <EventCard category={EventTypes.SEMINAR}/> */}
        </div>

        <Footer theme="light"/>
      </div>
    </>
  );
};

export default Home;
