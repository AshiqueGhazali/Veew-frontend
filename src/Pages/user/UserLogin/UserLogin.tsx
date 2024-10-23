import React, { useEffect, useState } from "react";
import "./UserLogin.css";
import GuestNavbar from "../../../Components/user/GuestNavbar/GuestNavbar";
import { toast } from "react-toastify";
import { userLogin } from "../../../api/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../Redux/slice/userAuthSlice";

import UseProtectLoginAndRegistration from "../../../hook/userSIde/useProtectLoginAndRegistration";
import ForgotPasswordModal from "../../../Components/user/ForgotPasswordModal/ForgotPasswordModal";
import useGoogleAuth from "../../../services/googleAuth";

interface loginForm {
  email: string;
  password: string;
}

export const UserLogin: React.FC = () => {
  UseProtectLoginAndRegistration();
  const [formData, setFormdata] = useState<loginForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { googleLogin } = useGoogleAuth();

  const handleContinue = async () => {
    try {
      const response = await userLogin(formData);

      if (response.status === 200) {
        dispatch(login(response.data.userData?.id));
        localStorage.setItem("isLogin","true")
        localStorage.removeItem("isEmailEntered");
        localStorage.removeItem("isOtpVerified");
        localStorage.removeItem("userEmail")
        navigate("/");
      }
    } catch (err: any) {
      if (err.response.status === 400) {
        setError(err.response.data.message);
      } else {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="user-login">
      <GuestNavbar page="signUp" />
      <div className="login-form">
        <div className="form-head">
          <h2>Welcome back!</h2>
        </div>
        <div>
          <div className="form-input">
            <input
              type="email"
              name="email"
              onChange={(e) =>
                setFormdata({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
            />
          </div>
          <div className="form-input">
            <input
              type="password"
              name="password"
              onChange={(e) =>
                setFormdata({ ...formData, password: e.target.value })
              }
              placeholder="Enter your password"
            />
          </div>
          <button className="continue-btn" onClick={handleContinue}>
            Continue
          </button>
        </div>
        <p onClick={() => setIsModalOpen(true)}>Forgot Password?</p>

        <div>
          <button
            className="continue-btn google-continue"
            onClick={() => {
              googleLogin();
            }}
          >
            Continue with google
          </button>
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
