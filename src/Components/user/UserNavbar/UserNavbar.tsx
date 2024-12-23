import React, { useEffect, useState } from "react";
import "./UserNavbar.css";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../../../assets/veewWhiteLogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/slice/userAuthSlice";
import { userLogout } from "../../../api/user";
import { IoAddCircle } from "react-icons/io5";
import { IoChatbubbles } from "react-icons/io5";
import { TiHome } from "react-icons/ti";
import { FaAlignJustify, FaUser } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import { RiContactsFill } from "react-icons/ri";




const navigation = [
  { name: "Home", href: "/" , icon:<TiHome />},
  { name: "profile", href: "/profile", icon:<FaUser /> },
  { name: "About", href: "/about", icon:<RiContactsFill /> },
  { name: "Events", href: "/events", icon:<FaAlignJustify /> },
  { name: "Pricing", href: "/pricing", icon:<IoMdPricetags /> },
];
const UserNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await userLogout();
      if (response.status === 200) {
        dispatch(logout());
        localStorage.removeItem("isLogin");
        navigate("/landing");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToAddEvent = () => {
    navigate("/add-new-event");
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          isScrolled ? "bg-[#0e1822]" : "bg-transparent"
        }`}
      >
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
                  location.pathname === item.href
                    ? "underline underline-offset-8"
                    : "no-underline"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-2 ">
            <div
              onClick={() => navigate("/chat")}
              className="text-white text-[30px] py-3 "
            >
              <IoChatbubbles />
            </div>
            <div
              onClick={navigateToAddEvent}
              className="text-white text-[35px] py-2 "
            >
              <IoAddCircle className="" />
            </div>
            <div onClick={handleLogout} className="text-white text-[30px]">
              <button
                onClick={handleLogout}
                className="bg-white shadow-xl  rounded-full w-28 hover:bg-gradient-to-r from-[#1ce480] to-[#01592d] hover:text-white"
              >
                <span className="font-semibold flex justify-center items-center">
                  Sign Out
                </span>
              </button>
            </div>
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
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 uppercase font-normal text-white  hover:bg-gray-50 hover:text-[#937e54] ${
                        location.pathname === item.href
                          ? "underline underline-offset-8"
                          : "no-underline"
                      }`}
                    >
                     <span className="ml-1 mr-2">{item.icon}</span> {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 pr-3 block uppercase rounded-lg px-3 py-2.5 text-base/7 font-normal text-white no-underline hover:bg-gray-50 hover:text-[#937e54]"
                    onClick={() => navigate("/chat")}
                  >
                    Messages
                  </a>
                  <a
                    href="#"
                    className="-mx-3 pr-3 block uppercase rounded-lg px-3 py-2.5 text-base/7 font-normal text-white no-underline hover:bg-gray-50 hover:text-[#937e54]"
                    onClick={navigateToAddEvent}
                  >
                    Add Event
                  </a>
                  <a
                    href="#"
                    className="-mx-3 pr-3 block uppercase rounded-lg px-3 py-2.5 text-base/7 font-normal text-white no-underline hover:bg-gray-50 hover:text-[#937e54]"
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
