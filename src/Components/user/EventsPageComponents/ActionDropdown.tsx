import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

interface dropdownProps {
  eventId: string;
  openUserReportModal: () => void;
  isHosts: boolean;
}

const ActionDropdown: React.FC<dropdownProps> = ({
  eventId,
  openUserReportModal,
  isHosts,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton
            className={`inline-flex w-full justify-center gap-x-1.5  bg-transparent py-2 text-sm font-semibold text-white`}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              id="dropdownLeftEndButton"
              data-dropdown-toggle="dropdownLeftEnd"
              data-dropdown-placement="left-end"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <a
                onClick={() => navigate(`/event-details?eventId=${eventId}`)}
                className="block cursor-pointer px-4 py-2 no-underline text-sm text-gray-100 data-[focus]:bg-gray-700 data-[focus]:text-gray-200 data-[focus]:outline-none"
              >
                view Details
              </a>
            </MenuItem>
            {isHosts ? (
              <></>
            ) : (
              <>
                <MenuItem>
                  <a className="block cursor-pointer px-4 py-2 no-underline text-sm text-gray-100 data-[focus]:bg-gray-700 data-[focus]:text-gray-200 data-[focus]:outline-none">
                    report event
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    onClick={openUserReportModal}
                    className="block cursor-pointer px-4 py-2 no-underline text-sm text-gray-100 data-[focus]:bg-gray-700 data-[focus]:text-gray-200 data-[focus]:outline-none"
                  >
                    report auther
                  </a>
                </MenuItem>
              </>
            )}
          </div>
        </MenuItems>
      </Menu>
    </>
  );
};

export default ActionDropdown;
