import React from "react";
import IEvents from "../../../interface/EventsInterface";
import ActionDropdown from "./ActionDropdown";
import { FaRegComment, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";

interface IComentsProps {
  isOpen: boolean;
  onClose: () => void;
  eventDetails: IEvents;
  isLiked: boolean;
  handleLike: (eventId: string) => void;
}

const people = [
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Michael Foster",
    email: "michael.foster@example.com",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Dries Vincent",
    email: "dries.vincent@example.com",
    role: "Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    role: "Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",
    role: "Director of Product",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
];

const PostComments: React.FC<IComentsProps> = ({
  isOpen,
  onClose,
  eventDetails,
  isLiked,
  handleLike,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="default-modal"
      role="dialog"
      aria-modal="true"
      className="fixed top-0 right-0 left-0  z-50 flex justify-center items-center w-full h-full max-h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full md:max-w-3xl max-h-full top-10">
        <div className="relative rounded-lg shadow bg-[#070d12]">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2 right-2 bg-gray-600 text-gray-100 bg-transparent rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center hover:bg-gray-400 hover:text-white"
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

          <img
            src={eventDetails.imageUrl}
            alt=""
            className="w-full max-h-[40vh]"
          />
          <div className="p-4 md:p-6">
            <div className="flex  justify-between">
              <div className="flex gap-2">
                <div className="flex gap-1">
                  {isLiked ? (
                    <FaThumbsUp
                      onClick={() => handleLike(eventDetails.id)}
                      className="cursor-pointer text-blue-500"
                    />
                  ) : (
                    <FaRegThumbsUp
                      onClick={() => handleLike(eventDetails.id)}
                      className="cursor-pointer"
                    />
                  )}
                  <p className="text-xs">{eventDetails.likes}</p>
                </div>
                <div className="flex gap-1">
                  <FaRegComment
                    onClick={() => onClose()}
                    className="cursor-pointer"
                  />
                  <p className="text-xs">{eventDetails.comments}</p>
                </div>
              </div>
              <ActionDropdown />
            </div>
            <div className="flex items-center justify-between mb-4 border-b border-gray-500 rounded-t">
              <h3 className="text-base font-semibold text-white">
                {eventDetails.eventTitle}
              </h3>
              <div>
                <p className="text-xs">{`${eventDetails.user.firstName} ${eventDetails.user.lastName}`}</p>
                <p className="text-xs">
                  {new Date(eventDetails.date).toDateString()}
                </p>
              </div>
            </div>
            <hr className="border-t border-gray-600" />
            {/* Modal body */}
            <div className="p-4 md:p-5 space-y-4 max-h-[200px] overflow-y-scroll">
              <ul role="list" className="divide-y divide-gray-100">
                {people.map((person) => (
                  <li
                    key={person.email}
                    className="flex justify-between gap-x-6 py-5"
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <img
                        alt=""
                        src={person.imageUrl}
                        className="size-8 flex-none rounded-full bg-gray-50"
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm/6 font-normal text-gray-200">
                          {person.name}
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          {person.email}
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm/6 text-gray-200">{person.role}</p>
                      {person.lastSeen ? (
                        <p className="mt-1 text-xs/5 text-gray-400">
                          Last seen{" "}
                          <time dateTime={person.lastSeenDateTime}>
                            {person.lastSeen}
                          </time>
                        </p>
                      ) : (
                        <div className="mt-1 flex items-center gap-x-1.5">
                          <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                            <div className="size-1.5 rounded-full bg-emerald-500" />
                          </div>
                          <p className="text-xs/5 text-gray-500">Online</p>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="border-t border-gray-600" />
            {/* Modal footer */}
            <div className="border-t rounded-b border-gray-600">
              <div className="flex justify-bitween">
                <input
                  id="search"
                  className="block w-full  ps-10 text-sm rounded-lg bg-transparent placeholder-gray-400 text-white border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
                  placeholder="Add a comment..."
                  required
                />
                <button
                  type="submit"
                  className="text-white  end-2.5 bottom-2.5 bg-transparent font-normal text-sm px-4 py-2"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComments;
