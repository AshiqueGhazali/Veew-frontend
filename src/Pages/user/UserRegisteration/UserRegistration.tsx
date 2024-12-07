import "./UserRegistration.css";
import FeatureList from "../../../Components/user/FeatureList/FeatureList";
import GuestNavbar from "../../../Components/user/GuestNavbar/GuestNavbar";
import RegistrationForm from "../../../Components/user/RegistrationForm/RegistrationForm";
import UserOtp from "../../../Components/user/RegistrationForm/UserOtp";
import EnterEmail from "../../../Components/user/RegistrationForm/EnterEmail";
import { Route, Routes, useLocation } from "react-router-dom";
import ProgressBar from "../../../Components/user/ProgressBar/ProgressBar";
import { useEffect, useState } from "react";
import UseProtectLoginAndRegistration from "../../../hook/userSIde/useProtectLoginAndRegistration";
import useProtectRoutes from "../../../hook/userSIde/useProtectRegistration";
import NotFoundPage from "../ErrorHandlingPages/NotFoundPage";

const UserRegistration = () => {
  UseProtectLoginAndRegistration();
  useProtectRoutes()

  const [step, setStep] = useState(1);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/sign-up/verification") {
      setStep(2);
    } else if (location.pathname === "/sign-up/register") {
      setStep(3);
    } else {
      setStep(1);
    }
  }, [location.pathname]);

  return (
    <div className="user-registration">
      <GuestNavbar page="signIn" />
      <div className="content">
        <FeatureList />
        <div className="registration-form">
          <ProgressBar step={step} />
          <Routes>
            <Route path="/" element={<EnterEmail />} />
            <Route path="verification" element={<UserOtp />} />
            <Route path="register" element={<RegistrationForm />} />
            <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
