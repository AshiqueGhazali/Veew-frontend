import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IUser } from "../../../interface/userInterface";
import { blockUser, getUserReports } from "../../../api/admin";
import ProfileAvtar from "../../../assets/man-profile.jpeg";
import ReportsModal from "./ReportsModal";
import { toast } from "react-toastify";

interface reportProps {
  searchQuery?: string;
}

// Interface for each report received
interface IReport {
  reason: string;
  reporter: IUser;
}

// Interface for the reported user details
interface IReportedUser {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  reportsReceived: IReport[];
}

// State type for the frontend
type ReportedUsersState = IReportedUser[];

const UserReports: React.FC<reportProps> = () => {
  const [reportedUsers, setReportedUsers] = useState<ReportedUsersState>([]);
  const [openReports, setOpenReports] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    const getReports = async () => {
      try {
        const response = await getUserReports();

        if (response.status === 200) {
          setReportedUsers(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getReports();
  }, []);

  const handleBlockUser = async (userId: string) => {
      try {
        console.log(userId);
  
        const response = await blockUser(userId);
  
        if (response.status === 200) {
          toast.success("User Blocked");
        }
      } catch (error) {
        console.log(error);
      }
    };

  const totalUsers = reportedUsers?.length || 0;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const paginatedReports = reportedUsers?.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="bg-white p-6  ">
        <div className="flex justify-between">
          <h3 className="uppercase text-[#546630]">USER REPORTS</h3>
          <div></div>
        </div>
        <div className="max-h-[400px] overflow-y-scroll scrollbar-hide">
          <ul role="list" className="divide-y divide-gray-100">
            {paginatedReports.map((person, index) => (
              <li key={index} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <img
                    alt=""
                    src={person.image || ProfileAvtar}
                    className="size-12 flex-none rounded-full bg-gray-50"
                  />
                  <div className="min-w-0 flex-auto cursor-pointer">
                    <p className="text-sm/6 font-semibold text-gray-900">
                      {`${person.firstName} ${person.lastName}`}
                    </p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                      {person.email}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setOpenReports(index)}
                      style={{ border: "1px solid gray" }}
                      className="text-gray-900 uppercase bg-transparent hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 border border-black"
                    >
                      view reports
                    </button>
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm">
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 4 15"
                          >
                            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                          </svg>
                        </MenuButton>
                      </div>

                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <div className="py-1">
                          <MenuItem>
                            <a
                              onClick={()=>handleBlockUser(person.id)}
                              className="block cursor-pointer no-underline uppercase px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            >
                              block user
                            </a>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center mt-6">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">{startIndex}</span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {endIndex < totalUsers ? endIndex : totalUsers}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {totalUsers}
          </span>{" "}
          Events
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button onClick={()=>handlePageChange(currentPage - 1)} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Prev
          </button>
          <button onClick={()=>handlePageChange(currentPage + 1)} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Next
          </button>
        </div>
      </div>
      </div>

      {openReports !== null && (
        <ReportsModal
          onClose={() => setOpenReports(null)}
          reportsReceived={reportedUsers[openReports].reportsReceived}
        />
      )}
    </>
  );
};

export default UserReports;
