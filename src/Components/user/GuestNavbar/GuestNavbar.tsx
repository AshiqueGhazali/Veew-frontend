import "./GuestNavbar.css";
import Logo from "../../../assets/veewLogo.png";
import { useNavigate } from "react-router-dom";

interface GuestNavbarProps {
  page: "signIn" | "signUp";
}

const GuestNavbar: React.FC<GuestNavbarProps> = ({ page }) => {
  const navigate = useNavigate();

  const handleAuthentication = () => {
    if (page === "signIn") {
      navigate("/login");
    } else if (page === "signUp") {
      navigate("/sign-up");
    }
  };

  const navigateToLangingPage = () => {
    navigate("/landing");
  };
  return (
    <div className="GuestNavbar fixed top-0">
      <div className="GuestNavbar-left" onClick={navigateToLangingPage}>
        <img src={Logo} alt="" />
      </div>
      <div className="GuestNavbar-right">
        <button className="dark-btn" onClick={handleAuthentication}>
          {page === "signIn" ? "Sign In" : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default GuestNavbar;
