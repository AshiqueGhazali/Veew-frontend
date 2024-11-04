import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store/store";
import { getUserProfileData } from "../../../api/user";
import { IUser } from "../../../interface/userInterface";
// import Footer from "../../../Components/user/Footer/Footer";
import ProfileSidePanel from "../../../Components/user/UserProfileComponents/ProfileSidePanel";
import Logo from "../../../assets/veewWhiteLogo.png";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ProfileHeader from "../../../Components/user/UserProfileComponents/ProfileHeader";
import UserEvent from "../UserEvents/UserEvent";
import SpeedDialMenu from "../../../Components/user/SpeedDialMenu/SpeedDialMenu";

export type listType = 'UPCOMING' | 'EXPIRED' 

const UserProfile: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user.userData.id);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isEdit, setEdit] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [pageTitle , setPageTitle] = useState<string>('')
  const [listType , setListType] = useState<listType>('UPCOMING')

  const navigate = useNavigate();
  const location = useLocation();

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
  }, [userId, isEdit]);

  const navigation = [
    { name: "Profile", href: "/profile" },
    { name: "Events", href: "/profile/events" },
    { name: "Tickets", href: "/profile/tickets" },
    { name: "Wallet", href: "/profile/wallet" },
  ]

  useEffect(()=>{
    const findTitle = navigation.find(item =>location.pathname === item.href)
    const title = findTitle ? findTitle.name : 'Page Not Found!'
    setPageTitle(title)

  },[location])

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-[#0e1822]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0" onClick={() => navigate("/")}>
                  <img alt="Your Company" src={Logo} className="h-8 w-16" />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={`
                          ${location.pathname === item.href
                            ? "bg-gray-800 text-white "
                            : "text-gray-300 hover:bg-gray-700 hover:text-white "
                          } 
                          no-underline rounded-md px-3 py-2 text-sm font-medium`}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="relative rounded-full bg-[#0e1822] p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                  <Menu as="div" className="relative ml-3">
                    <div onClick={() => setOpen(true)}>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-[#0e1822] text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt=""
                          src={userData?.image}
                          className="h-8 w-8 rounded-full"
                        />
                      </MenuButton>
                    </div>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block h-6 w-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden h-6 w-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={`${location.pathname === item.href 
                      ? "bg-gray-800 text-white no-underline"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"}
                    block rounded-md px-3 py-2 text-base font-medium no-underline
                  `}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0" onClick={() => setOpen(true)}>
                  <img
                    alt=""
                    src={userData?.image}
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <div className="ml-3" onClick={() => setOpen(true)}>
                  <div className="text-base/5 font-medium text-white">{`${userData?.firstName} ${userData?.lastName}`}</div>
                  <div className="text-sm font-medium text-gray-400">
                    {userData?.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              <ProfileHeader title={pageTitle} listType={listType} setListType={setListType}/>
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/events" element={<UserEvent/>}/>
            </Routes>  
          </div>
        </main>
      </div>
      <ProfileSidePanel
        open={open}
        setOpen={setOpen}
        userData={userData}
        setEdit={setEdit}
        isEdit={isEdit}
      />

      <SpeedDialMenu/>
        {/* <Footer /> */}
    </>
  );
};

export default UserProfile;
