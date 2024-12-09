import React, { useEffect, useState } from "react";

interface dropdownProps{
  isPage?:boolean
}

const ActionDropdown: React.FC<dropdownProps> = ({isPage}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(()=>{
    if (window.innerWidth <= 1024) {
      setIsMobile(true);
    }
  },[])
  const toggleAcrionbar = () => {
    setOpen(!isOpen);
  };
  return (
    <>
      <div>
        <svg
          onClick={() => toggleAcrionbar()}
          className="w-5 h-5"
          aria-hidden="true"
          id="dropdownLeftEndButton" data-dropdown-toggle="dropdownLeftEnd" data-dropdown-placement="left-end"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>

        {isOpen && (
          <div
            id="dropdownLeftEnd"
            onMouseLeave={() => toggleAcrionbar()}
            className={`z-10  absolute  divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700 divide-gray-600 ${isPage|| isMobile ? 'right-4':''}`}
          >
            <ul
              className="py-2 text-sm list-none text-gray-200"
              aria-labelledby="dropdownLeftEndButton"
            >
              <li>
                <a className="block no-underline px-4 py-2 text-gray-200 hover:bg-gray-600 hover:text-white cursor-pointer">
                  view Details
                </a>
              </li>
              <li>
                <a className="block no-underline px-4 py-2 text-gray-200 hover:bg-gray-600 hover:text-white cursor-pointer">
                  report event
                </a>
              </li>
              <li>
                <a className="block no-underline px-4 py-2 text-gray-200 hover:bg-gray-600 hover:text-white cursor-pointer">
                  report auther
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default ActionDropdown;
