import React, { useEffect, useState } from "react";
import Logo from "../../../assets/veewWhiteLogo.png";
import { CgProfile } from "react-icons/cg";
import "./UserNavbar.css";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { IoTicketSharp, IoWalletSharp } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/slice/userAuthSlice";
import { getUserProfileData, userLogout } from "../../../api/user";
import { IUser } from "../../../interface/userInterface";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store/store";

// interface UserNavbarProps {
//   userData: IUser|null;
// }

const UserNavbar: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userId = useSelector((state: RootState) => state.user.userData.id);
  const [userData, setUserData] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const response = await getUserProfileData(userId);
          if (response.status === 200) {
            setUserData(response.data.userData);
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      } else {
        console.error("User ID is null or undefined");
      }
    };

    fetchUserData();
  }, [userId]);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const handleLogout = async () => {
    try {
      const response = await userLogout();
      if (response.status === 200) {
        dispatch(logout());
        localStorage.removeItem("isLogin")
        navigate("/landing");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "active" : "";
  };

  const navigateToAddEvent = ()=>{
    navigate('/add-new-event')
  }
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <div className="navCenter">
        <ul className="nav-links">
          <li>
            <a href="/" className={isActive("/")}>
              Home
            </a>
          </li>
          <li>
            <a href="/profile" className={isActive("/profile")}>
              Profile
            </a>
          </li>
          <li>
            <a href="/about" className={isActive("/about")}>
              About
            </a>
          </li>
          <li>
            <a href="/events" className={isActive("/events")}>
              Events
            </a>
          </li>
          <li>
            <a href="/pricing" className={isActive("/pricing")}>
              Pricing
            </a>
          </li>
        </ul>
      </div>
      <div className="nav-icons">
        <button className="icon-button" onClick={navigateToAddEvent}>+</button>
        <div
          className="profile-icon"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CgProfile />
        </div>
      </div>

      {dropdownVisible && (
        <div
          className="dropdown-menu"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="user-info" onClick={() => navigate("/profile")}>
            <img
              src={userData?.image? userData.image: "https://via.placeholder.com/50"}
              alt="User"
              className="profile-pic"
            />
            <div>
              <p className="user-name">{`${userData?.firstName} ${userData?.lastName}`}</p>
              <p className="user-email">{userData?.email}</p>
            </div>
          </div>
          <ul>
            <Link to={"/userEvents"} className="dropdown-link">
              <li>
                <span className="navlink-icons">
                  <RiCalendarScheduleFill />
                </span>{" "}
                My Events
              </li>
            </Link>
            <Link to={"/userEvents"} className="dropdown-link">
              <li>
                <span className="navlink-icons">
                  <IoTicketSharp />
                </span>{" "}
                My Ticket
              </li>
            </Link>
            <Link to={"/userEvents"} className="dropdown-link">
              <li>
                <span className="navlink-icons">
                  <IoWalletSharp />
                </span>{" "}
                Wallet
              </li>
            </Link>
            <Link to={"/userEvents"} className="dropdown-link">
              <li>
                <span className="navlink-icons">
                  <MdNotificationsActive />
                </span>{" "}
                Notifications
              </li>
            </Link>
            <li className="active" onClick={handleLogout}>
              <span className="navlink-icons">
                <TbLogout2 />
              </span>{" "}
              Logout
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
