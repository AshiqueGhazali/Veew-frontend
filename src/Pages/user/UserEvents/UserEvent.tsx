import React, { useEffect, useState } from "react";
import UserProfileEventCard from "../../../Components/user/UserProfileEvents/UserProfileEventCard";
import { getHostedEvents } from "../../../api/user";
import IEvents from "../../../interface/EventsInterface";

const contacts = [
  {
    name: "Jane Cooper",
    role: "Admin",
    position: "Regional Paradigm Technician",
    imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Cody Fisher",
    role: "Admin",
    position: "Product Directives Officer",
    imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Esther Howard",
    role: "Admin",
    position: "Forward Response Developer",
    imageUrl: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    name: "Jenny Wilson",
    role: "Admin",
    position: "Central Security Manager",
    imageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    name: "Kristin Watson",
    role: "Admin",
    position: "Lead Implementation Liaison",
    imageUrl: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    name: "Cameron Williamson",
    role: "Admin",
    position: "Internal Applications Engineer",
    imageUrl: "https://randomuser.me/api/portraits/men/6.jpg",
  },
];

const UserEvent: React.FC = () => {
  const [events, setEvents] = useState<IEvents[] | null>(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await getHostedEvents();
        if (response.status === 200) {
          console.log(response);
          setEvents(response.data);
        }
      } catch (error) {
        console.log("somthing went wronggggg", error);
      }
    };

    getEvents();
  }, []);

  return (
    <>
      {events && events?.length > 0 ? (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {events?.map((event, index) => (
            <UserProfileEventCard eventData={event} key={index} />
          ))}
        </div>
      ) : (
        <h1>You did't host events yet?</h1>
      )}
    </>
  );
};

export default UserEvent;
