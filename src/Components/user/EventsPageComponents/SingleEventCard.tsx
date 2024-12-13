import React, { useEffect, useState } from "react";
import IEvents from "../../../interface/EventsInterface";
import { useNavigate } from "react-router-dom";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { addLike, removeLike } from "../../../api/user";
import { toast } from "react-toastify";
import PostComments from "./PostComments";
import ActionDropdown from "./ActionDropdown";
import './EventsListing.css'
import UserReportModal from "../ReportingModals/UserReportModal";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store/store";

interface ICardProps {
  eventData: IEvents;
  isLiked: boolean;
}

const SingleEventCard: React.FC<ICardProps> = ({ eventData, isLiked }) => {
  const userId = useSelector((state: RootState) => state.user.userData.id);

  const [event, setEvent] = useState<IEvents | null>(null);
  const [liked, setLike] = useState<boolean>(false);
  const [isOpenComentsModal, setOpenCommentsModal] = useState<boolean>(false);
  const [isUserReportModal , setUserReportModal] = useState<boolean>(false)


  const navigate = useNavigate();

  useEffect(() => {
    if (isLiked) {
      setLike(isLiked);
    }
  }, [isLiked]);

  useEffect(() => {
    setEvent(eventData);
  }, [eventData]);

  const handleLike = async (eventId: string) => {
    try {
      if (liked) {
        setLike(false);
        setEvent((prevEvent) => {
          if (!prevEvent) return null;
          return {
            ...prevEvent,
            likes: prevEvent.likes - 1,
          };
        });

        await removeLike(eventId);
      } else {
        setLike(true);
        setEvent((prevEvent) => {
          if (!prevEvent) return null;
          return {
            ...prevEvent,
            likes: prevEvent.likes + 1,
          };
        });
        await addLike(eventId);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <>
      {event && (
        <div className="bg-gray-900 p-6 rounded-lg  fullCard">
          <div className="flex justify-between mb-2">
            <div className="flex  gap-2">
              <div className="relative w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                {event.user.image ? (
                  <img src={event.user.image} alt="" className="w-5 h-5" />
                ) : (
                  <svg
                    className="absolute w-12 h-12 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 35 35"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </div>
              <p className="text-sm max-w-[150px] truncate cursor-pointer">{`${event.user.firstName} ${event.user.lastName}`}</p>
            </div>
            <ActionDropdown eventId={event.id} openUserReportModal={()=>setUserReportModal(true)} isHosts={eventData.hostsId === userId}/>
          </div>
          <div
            className="event-card"
            onClick={() => navigate(`/event-details?eventId=${event.id}`)}
          >
            <img src={event.imageUrl} alt="" />
          </div>
          <div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <div className="flex gap-1">
                  {liked ? (
                    <FaThumbsUp
                      onClick={() => handleLike(event.id)}
                      className="cursor-pointer text-blue-500"
                    />
                  ) : (
                    <FaRegThumbsUp
                      onClick={() => handleLike(event.id)}
                      className="cursor-pointer"
                    />
                  )}
                  <p className="text-xs">{event.likes}</p>
                </div>
                <div className="flex gap-1">
                  <FaRegComment
                    onClick={() => setOpenCommentsModal(true)}
                    className="cursor-pointer"
                  />
                  <p className="text-xs">{event.comments}</p>
                </div>
              </div>
              <p className="text-xs">{new Date(event.date).toDateString()}</p>
            </div>
            <p className="text-sm mt-1">{event.eventTitle}</p>
          </div>
        </div>
      )}

      {event && (
        <PostComments
          isOpen={isOpenComentsModal}
          onClose={() => setOpenCommentsModal(false)}
          eventDetails={event}
          isLiked={liked}
          handleLike={handleLike}
          setEvent={setEvent}
          openUserReportModal={()=>setOpenCommentsModal(true)}
        />
      )}

      {isUserReportModal && (
        <UserReportModal isOpen={isUserReportModal} onClose={()=>setUserReportModal(false)} hostsId={eventData.hostsId}/>
      )}
    </>
  );
};

export default SingleEventCard;
