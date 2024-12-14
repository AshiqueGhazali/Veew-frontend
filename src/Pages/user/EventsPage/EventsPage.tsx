import React, { useEffect, useState } from "react";
import "./EventsPage.css";
import UserNavbar from "../../../Components/user/UserNavbar/UserNavbar";
import Footer from "../../../Components/user/Footer/Footer";
import EventsListing from "../../../Components/user/EventsPageComponents/EventsListing";
import IEvents from "../../../interface/EventsInterface";
import { getAllCategories, getUpcomingEvents } from "../../../api/user";
import "flowbite";
import { Datepicker } from "flowbite";

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<IEvents[] | null>(null);
  const [categories, setCategories] = useState<string[]>();
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  // const [filterdDate , filerByDate] = useState()

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
          console.log(categories);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllEventDetails();
    getCategories();

    if (typeof window !== "undefined") {
      const datepicker = document.getElementById("datepicker-inline");
      if (datepicker) {
        new Datepicker(datepicker);
      }
    }
  }, []);
  return (
    <>
      <UserNavbar />
      
      <div className="events-page">
        <div className="event-hero">
          <div className="event-hero-head mt-[200px] max-h-[100vh] md:mt-0">
            <h1>
              Ready for Something New?
              <br />
              Start Searching!
            </h1>
            <div className="hero-search-btn">
              <input
                type="search"
                className="search-input"
                placeholder="search..."
                onChange={(e)=>setSearchQuery(e.target.value)}
              />
              <button className="btn search-btn">Search</button>
            </div>
            

            <div className="flex overflow-x-scroll scrollbar-hide flex-col md:flex-row gap-4 mt-10 max-w-4xl mx-auto mb-[100px] md:mb-0">
              <div
                onClick={() => {
                  setCategory("");
                }}
                className="bg-[#666666] p-6 py-8 min-w-[300px] md:min-w-[200px] rounded-lg text-center text-white hover:bg-[#555555] focus:bg-[#444444] cursor-pointer"
                tabIndex={0}
              >
                <h3 className="text-2xl font-semibold uppercase">All</h3>
              </div>
              {categories?.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      setCategory(item);
                    }}
                    className={`min-w-[300px] md:min-w-[200px] p-6 py-8 rounded-lg text-center text-white hover:bg-[#555555] focus:bg-[#444444] cursor-pointer ${
                      item === category ? `bg-[#444444]` : "bg-[#666666]"
                    }`}
                    tabIndex={index}
                    key={index}
                  >
                    <h3 className="text-2xl font-semibold">{item}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="">
            <div>
              <EventsListing
                events={events}
                category={category}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        </div>
        <Footer theme="light" />
      </div>
    </>
  );
};

export default EventsPage;
