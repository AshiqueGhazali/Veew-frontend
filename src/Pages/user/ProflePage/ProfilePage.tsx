import React from "react";
import StatusCards from "../../../Components/user/ProfileComponents/StatusCards";
import imageOne from "../../../assets/eventOne.jpeg";
import imageTwo from "../../../assets/eventTwo.jpeg";

const ProfilePage: React.FC = () => {
  return (
    <div>
      <StatusCards />
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-center mt-10">
          <div>
            <h1>Track, Manage, and Monetize.</h1>
            <p>
              Easily access and manage all the events you've created from your
              profile. Update event details, monitor attendee numbers in real
              time, and track ticket sales at a glance. Whether you’re hosting a
              webinar, seminar, or conference, Veew provides you with all the
              tools to make your event a success. Your event management journey
              begins here!
            </p>
          </div>
          <div>
            <img
              className="w-full max-w-[500px] rounded-lg h-auto object-cover"
              src={imageOne}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row-reverse gap-6 gap-6 justify-center items-center mt-10">
          <div>
            <h1 className="md:text-[36px]">Stay Organized, Stay Engaged.</h1>
            <p>
              View all your purchased tickets for upcoming events in one
              convenient location. Keep track of event dates, ticket codes, and
              payment details effortlessly. Joining events is seamless—no
              hassle, no confusion. With Veew, staying on top of your
              engagements has never been easier!
            </p>
          </div>
          <div>
            <img
              className="w-full md:min-w-[500px] max-w-[500px] rounded-lg h-auto object-cover"
              src={imageTwo}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
