import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../Pages/user/LandingPage/LandingPage";
import UserRegistration from "../Pages/user/UserRegisteration/UserRegistration";
import "react-toastify/dist/ReactToastify.css";
import { UserLogin } from "../Pages/user/UserLogin/UserLogin";
import Home from "../Pages/user/Home/Home";
import UserProtectRoutes from "./UserProtectRoutes";
import UserProfile from "../Pages/user/UserProfile/UserProfile";
import Pricing from "../Pages/user/Pricing/Pricing";
import SuccessPage from "../Pages/user/SuccessPage/SuccessPage";
import FailurePage from "../Pages/user/SuccessPage/FailurePage";
import AddEvent from "../Pages/user/AddEvent/AddEvent";
import EventsPage from "../Pages/user/EventsPage/EventsPage";
import EventDetailsPage from "../Pages/user/EventDetailsPage/EventDetailsPage";
import VideoCall from "../Pages/user/VideoCall/VideoConferencePage";
import NotFoundPage from "../Pages/user/ErrorHandlingPages/NotFoundPage";
import ChatingPage from "../Pages/user/Chat/Chat";

const UserRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/sign-up/*" element={<UserRegistration />} />
        <Route path="/login" element={<UserLogin />} />
        <Route element={<UserProtectRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsPage/>}/>
          <Route path="/profile/*" element={<UserProfile />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/success" element={<SuccessPage/>} />
          <Route path="/failure" element={<FailurePage/>} />
          <Route path="/add-new-event" element={<AddEvent/>}/>
          <Route path="/event-details" element={<EventDetailsPage/>}/>
          <Route path="/meet" element={<VideoCall/>}/>
          <Route path="/chat" element={<ChatingPage/>}/>
        </Route>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </>
  );
};

export default UserRoutes;
