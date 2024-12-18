import React, { useEffect, useState } from "react";
import IEvents from "../../../interface/EventsInterface";
import ActionDropdown from "./ActionDropdown";
import { FaRegComment, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store/store";
import { Dispatch, SetStateAction } from "react";
import ListComments from "../Comments/ListComments";

// import EmojiPicker from "emoji-picker-react";

interface IComentsProps {
  isOpen: boolean;
  onClose: () => void;
  eventDetails: IEvents;
  isLiked: boolean;
  handleLike: (eventId: string) => void;
  setEvent: Dispatch<SetStateAction<IEvents | null>>;
  openUserReportModal:()=>void
  openEventReportModal:()=>void
}

const PostComments: React.FC<IComentsProps> = ({
  isOpen,
  onClose,
  eventDetails,
  isLiked,
  handleLike,
  openUserReportModal,
  openEventReportModal
}) => {
  if (!isOpen) return null;
  const userId = useSelector((state: RootState) => state.user.userData.id);
  const [totalComments , setTotalComments] = useState<number>(0)

  useEffect(() => {
    setTotalComments(eventDetails.comments)

  }, [eventDetails]);

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
                  <p className="text-xs">{totalComments}</p>
                </div>
              </div>
              <ActionDropdown  eventId={eventDetails.id}   openUserReportModal={openUserReportModal} isHosts={eventDetails.hostsId === userId ? true : false} openEventReportModal={openEventReportModal} hostsId={eventDetails.hostsId} userId={userId as string} />
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
            <ListComments eventId={eventDetails.id} userId={userId || ''} isDark={true} />
            
            {/* fdfdasfsf */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComments;