import React, { useEffect, useRef, useState } from "react";
import "./RegistrationForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyOtp, sendOtp } from "../../../api/user";

const UserOtp: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [timeLeft, setTimeLeft] = useState<number>(180);

  const navigate = useNavigate();
  const location = useLocation();
  const { userEmail } = location.state || {};

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] !== "") {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    } else if (e.key >= "0" && e.key <= "9") {
      const newOtp = [...otp];
      newOtp[index] = e.key;
      setOtp(newOtp);
      if (index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
      e.preventDefault();
    }
  };

  const handleFocus = (index: number) => {
    if (otp[index] === "") {
      inputRefs.current[index]?.select();
    }
  };

  const handleVerification = async () => {
    const userOtp = Number(otp.join(""));
    try {
      const response = await verifyOtp(userOtp);

      console.log("res is", response);

      if (response.status === 200) {
        navigate("/sign-up/register");
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        toast.error("OTP verification failed!");
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
        toast.error(error);
      }
    }
  };

  const resendOtp = async () => {
    try {
      const response = await sendOtp(userEmail);

      if (response.status === 200) {
        setTimeLeft(180);
        toast.info("OTP resent successfully!");
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="form-head">
        <h2>Just one step away!</h2>
        <p>Please enter the OTP sent to {userEmail}</p>
      </div>
      <div>
        <div className="otp-input">
          {otp.map((_, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={() => handleFocus(index)}
              autoFocus={index === 0}
              className="otp-digit"
            />
          ))}
        </div>
        <button className="verity-btn" onClick={handleVerification}>
          Continue
        </button>
      </div>
      <div className="countdown">
        {timeLeft > 0 ? (
          <p>
            Time remaining:{" "}
            {`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? "0" : ""}${
              timeLeft % 60
            }`}
          </p>
        ) : (
          <p>
            Didn't get the OTP?{" "}
            <span className="resend-link" onClick={resendOtp}>
              Send again
            </span>
          </p>
        )}
      </div>
    </>
  );
};

export default UserOtp;
