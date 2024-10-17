import { useNavigate } from "react-router-dom";
import "./RegistrationForm.css";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { sendOtp } from "../../../api/user";

const EnterEmail = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  console.log(loading);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleContinue = async () => {
    if (!validateEmail(email)) {
      setError("please Enter a valid Email");
      // toast.error(error)
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await sendOtp(email);

      if (response.status === 200) {
        navigate("/sign-up/verification", {
          state: {
            userEmail: email,
          },
        });
      } else {
        setError("Failed to send OTP. Please try again later.");
      }
    } catch (err: any) {
      if (err.response.status === 500 || err.response.status === 401) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <div className="form-head">
        <h2>Let's Get Started</h2>
      </div>
      <div>
        <div className="form-input">
          <input
            type="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter your email"
          />
        </div>
        <button className="continue-btn" onClick={handleContinue}>
          Continue
        </button>
      </div>

      <div className="or-divider">
        <p>or continue with</p>
      </div>
      <div className="social-buttons">
        <button className="google-btn social-button">
          <FaGoogle /> Google
        </button>
        <button className="facebook-btn social-button">
          <FaFacebookF /> Facebook
        </button>
      </div>
    </>
  );
};

export default EnterEmail;
