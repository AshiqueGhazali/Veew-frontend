import { useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";

  const useProtectRoutes = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isEmail = localStorage.getItem("isEmailEntered");
    const isOtp = localStorage.getItem("isOtpVerified");

    const isEmailEntered = isEmail ? JSON.parse(isEmail) : false;
    const isOtpVerified = isOtp ? JSON.parse(isOtp) : false;
    const email = localStorage.getItem("userEmail")


  
    useEffect(() => {
      if (location.pathname === "/sign-up/verification" || location.pathname === "/sign-up/register" && !isEmailEntered) {
        navigate("/");
      }

      if(isEmailEntered && isOtpVerified){
        navigate("register")
      }

      if(isEmailEntered && !isOtpVerified){
        console.log("herrrrrr");
        
        navigate("verification",{
            state: {
              userEmail: email,
            },
          })
      }
  
      if (location.pathname === "/sign-up/register" && !isOtpVerified) {
        navigate("verification",{
            state: {
              userEmail: email,
            },
          });
      }
    }, [location.pathname, isEmailEntered, isOtpVerified, navigate]);
  };
  
  export default useProtectRoutes;
