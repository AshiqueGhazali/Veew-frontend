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
  const [events, setEvents] = useState<IEvents[] | null>(null);
  const [categories, setCategories] = useState<string[]>();
  const [showSecondH, setSecondShow] = useState(false);
  const [showPargraph, setShowParagraph] = useState(false);


  setTimeout(() => {
    setSecondShow(true);
  }, 1500);
  setTimeout(() => {
    setShowParagraph(true);
  }, 2500);

  useEffect(() => {
    const getAllEventDetails = async () => {
      try {
        const response = await getUpcomingEvents();

        if (response.status === 200) {
          setEvents(response.data);
        }
      } catch (error) {
        console.log("somthing went wronggg");
      }
    };

    const getCategories = async () => {
      try {
        const response = await getAllCategories();

        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllEventDetails();
    getCategories();
  }, []);

  return (
    <>
      <img src={Banner} alt="" className="hero-banner" />
      <UserNavbar />
      <div className="user-home bg-dard">
        <div className="home-hero">
          <div className="hero-caption ">
            <h1
              className="overflow-hidden  whitespace-nowrap border-r-2 border-gray-400 animate-typing text-xl font-bold max-w-[800px] break-words bg-gradient-to-l from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text"
              style={{ animationDelay: "0s" }}
            >
              Ready for Something New?
            </h1>
            {showSecondH && (
              <h1
                className="overflow-hidden whitespace-nowrap border-r-2 border-gray-400 animate-typing text-xl font-bold max-w-[800px] break-words bg-gradient-to-l from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text"
                style={{ animationDelay: "0s" }}
              >
                Start Searching!
              </h1>
            )}
            {showPargraph && (
              <p
                className="overflow-hidden whitespace-nowrap border-r-2 border-gray-400 animate-typing mt-2 break-words"
                style={{ animationDelay: "0s" }}
              >
                Find the right plan to fuel your growth
              </p>
            )}
          </div>
        </div>
        <StatsSection />
        <div className="event-card-home">
          {categories?.map((category) => {
            const isEvent = events?.some(
              (event) => event.category === category && !event.isCancelled
            );
            return isEvent ? (
              <HomeEvents category={category} events={events} key={category} />
            ) : null;
          })}
        </div>

        <Footer theme="light" />
      </div>
    </>
  );
};

export default Home;
