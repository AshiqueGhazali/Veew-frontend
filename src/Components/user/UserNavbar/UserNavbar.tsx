import React, {useState } from "react";
import "./UserNavbar.css";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../../../assets/veewWhiteLogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/slice/userAuthSlice";
import { userLogout } from "../../../api/user";

const navigation = [
  { name: "Home", href: "/" },
  { name: "profile", href: "/profile" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Pricing", href: "/pricing" },
];
const UserNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation();

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


  const navigateToAddEvent = ()=>{
        navigate('/add-new-event')
    }

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src={Logo} className="h-8 w-auto" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-base  font-semibold text-white ${
                  location.pathname === item.href ? "underline underline-offset-8" : "no-underline"
                }`} 
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button
              type="button"
              className="inline-flex mr-2 items-center rounded-md bg-[#937e54] px-3 py-2 text-xs font-normal  text-white shadow-sm hover:bg-[#bea980]"
              onClick={navigateToAddEvent}
            >
              ADD EVENT
            </button>
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-[#937e54] px-3 py-2  font-normal text-xs text-white shadow-sm hover:bg-[#bea980]"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#101722] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img alt="" src={Logo} className="h-8 w-auto" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white  hover:bg-gray-50 hover:text-[#937e54] ${
                        location.pathname === item.href ? "underline underline-offset-8" : "no-underline"
                      }`}
                      >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white no-underline hover:bg-gray-50 hover:text-[#937e54]"
                    onClick={navigateToAddEvent}
                  >
                    Add Event
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white no-underline hover:bg-gray-50 hover:text-[#937e54]"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>
  );
};

export default UserNavbar;





// import React, { useEffect, useState } from "react";
// import Logo from "../../../assets/veewWhiteLogo.png";
// import { CgProfile } from "react-icons/cg";
// import "./UserNavbar.css";
// import { RiCalendarScheduleFill } from "react-icons/ri";
// import { IoTicketSharp, IoWalletSharp } from "react-icons/io5";
// import { MdNotificationsActive } from "react-icons/md";
// import { TbLogout2 } from "react-icons/tb";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logout } from "../../../Redux/slice/userAuthSlice";
// import { getUserProfileData, userLogout } from "../../../api/user";
// import { IUser } from "../../../interface/userInterface";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../Redux/store/store";


// const UserNavbar: React.FC = () => {
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const userId = useSelector((state: RootState) => state.user.userData.id);
//   const [userData, setUserData] = useState<IUser | null>(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (userId) {
//         try {
//           const response = await getUserProfileData(userId);
//           if (response.status === 200) {
//             setUserData(response.data.userData);
//           }
//         } catch (error) {
//           console.error("Failed to fetch user data:", error);
//         }
//       } else {
//         console.error("User ID is null or undefined");
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   const handleMouseEnter = () => {
//     setDropdownVisible(true);
//   };

//   const handleMouseLeave = () => {
//     setDropdownVisible(false);
//   };

//   const handleLogout = async () => {
//     try {
//       const response = await userLogout();
//       if (response.status === 200) {
//         dispatch(logout());
//         localStorage.removeItem("isLogin")
//         navigate("/landing");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const isActive = (path: string) => {
//     return location.pathname === path ? "active" : "";
//   };

//   const navigateToAddEvent = ()=>{
//     navigate('/add-new-event')
//   }
//   return (
//     <nav className="navbar">
//       <div className="logo">
//         <img src={Logo} alt="" />
//       </div>
//       <div className="navCenter">
//         <ul className="nav-links">
//           <li>
//             <a href="/" className={isActive("/")}>
//               Home
//             </a>
//           </li>
//           <li>
//             <a href="/profile" className={isActive("/profile")}>
//               Profile
//             </a>
//           </li>
//           <li>
//             <a href="/about" className={isActive("/about")}>
//               About
//             </a>
//           </li>
//           <li>
//             <a href="/events" className={isActive("/events")}>
//               Events
//             </a>
//           </li>
//           <li>
//             <a href="/pricing" className={isActive("/pricing")}>
//               Pricing
//             </a>
//           </li>
//         </ul>
//       </div>
//       <div className="nav-icons">
//         <button className="icon-button" onClick={navigateToAddEvent}>+</button>
//         <div
//           className="profile-icon"
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           <CgProfile />
//         </div>
//       </div>

//       {dropdownVisible && (
//         <div
//           className="dropdown-menu"
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           <div className="user-info" onClick={() => navigate("/profile")}>
//             <img
//               src={userData?.image? userData.image: "https://via.placeholder.com/50"}
//               alt="User"
//               className="profile-pic"
//             />
//             <div>
//               <p className="user-name">{`${userData?.firstName} ${userData?.lastName}`}</p>
//               <p className="user-email">{userData?.email}</p>
//             </div>
//           </div>
//           <ul>
//             <Link to={"/userEvents"} className="dropdown-link">
//               <li>
//                 <span className="navlink-icons">
//                   <RiCalendarScheduleFill />
//                 </span>{" "}
//                 My Events
//               </li>
//             </Link>
//             <Link to={"/userEvents"} className="dropdown-link">
//               <li>
//                 <span className="navlink-icons">
//                   <IoTicketSharp />
//                 </span>{" "}
//                 My Ticket
//               </li>
//             </Link>
//             <Link to={"/userEvents"} className="dropdown-link">
//               <li>
//                 <span className="navlink-icons">
//                   <IoWalletSharp />
//                 </span>{" "}
//                 Wallet
//               </li>
//             </Link>
//             <Link to={"/userEvents"} className="dropdown-link">
//               <li>
//                 <span className="navlink-icons">
//                   <MdNotificationsActive />
//                 </span>{" "}
//                 Notifications
//               </li>
//             </Link>
//             <li className="active" onClick={handleLogout}>
//               <span className="navlink-icons">
//                 <TbLogout2 />
//               </span>{" "}
//               Logout
//             </li>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default UserNavbar;
