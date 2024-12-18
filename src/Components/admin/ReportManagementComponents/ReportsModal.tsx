import React, { useEffect} from "react";
import { IUser } from "../../../interface/userInterface";
import profileAvtar from "../../../assets/man-profile.jpeg";

interface IReport {
  reason: string;
  reporter: IUser;
}

interface reportModalProps {
  onClose: () => void;
  reportsReceived: IReport[];
}

const ReportsModal: React.FC<reportModalProps> = ({
  onClose,
  reportsReceived,
}) => {
  

  useEffect(() => {
    console.log("repoooooooooooooooorttt", reportsReceived);
  }, []);

  
  return (
    <div
      id="default-modal"
      role="dialog"
      aria-modal="true"
      className="fixed top-0 right-0 left-0  z-50 flex justify-center items-center w-full h-full max-h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full md:max-w-3xl max-h-full top-10">
        <div className="relative rounded-lg shadow bg-white">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2 right-2 bg-gray-600 text-gray-100 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center hover:bg-gray-400 hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          <div className="p-4 md:p-6">
            <div
              className={`p-4 md:p-5 space-y-4 max-h-[400px] overflow-y-scroll`}
            >
              {reportsReceived ? (
                <>
                  {reportsReceived.length > 0 ? (
                    <ul
                      role="list"
                      className="divide-y list-none divide-gray-100"
                    >
                      {reportsReceived?.map((item, index) => (
                        <li key={index}>
                          <div className="flex justify-between gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                              <img
                                alt=""
                                src={item.reporter.image || profileAvtar}
                                className="size-8 flex-none rounded-full bg-gray-50"
                              />
                              <div className="min-w-0 flex-auto">
                                <p className={`text-sm text-gray-800`}>
                                  <span
                                    className={`text-base font-normal cursor-pointer text-gray-900`}
                                  >
                                    {`${item.reporter.firstName} ${item.reporter.lastName}`}{" "}
                                  </span>
                                  {item.reason}
                                </p>
                                {/* <div className="flex gap-4 cursor-pointer">
                            // date here
                          </div> */}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <>
                      <div className="flex flex-col w-full justify-center items-center p-6">
                        <h2>NO reports.</h2>
                        <p className={`text-sm text-gray-600`}>No Reports.</p>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsModal;
