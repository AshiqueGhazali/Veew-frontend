import React, { useEffect, useState } from "react";
import IEvents from "../../../interface/EventsInterface";
import ActionDropdown from "./ActionDropdown";
import { FaRegComment, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import {
  deleteComment,
  getEventComments,
  postComment,
} from "../../../api/user";
import IComments from "../../../interface/CommentsInterface";
import { formatDistanceToNow, set } from "date-fns";
import profileAvtar from "../../../assets/man-profile.jpeg";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store/store";
import { Dispatch, SetStateAction } from "react";
// import EmojiPicker from "emoji-picker-react";

interface IComentsProps {
  isOpen: boolean;
  onClose: () => void;
  eventDetails: IEvents;
  isLiked: boolean;
  handleLike: (eventId: string) => void;
  setEvent: Dispatch<SetStateAction<IEvents | null>>;
}

interface replay {
  parantId: string;
  parantUser: string;
}

const PostComments: React.FC<IComentsProps> = ({
  isOpen,
  onClose,
  eventDetails,
  isLiked,
  handleLike,
  setEvent,
}) => {
  if (!isOpen) return null;
  const userId = useSelector((state: RootState) => state.user.userData.id);

  const [comment, setComment] = useState("");
  const [changesOn, setChangesOn] = useState<number>(0);
  const [allComments, setAllComments] = useState<IComments[] | null>(null);
  const [openComentOptions, setComentOptions] = useState<string>("");
  const [replayDetails, setReplayDetails] = useState<replay | null>(null);

  useEffect(() => {
    const getAllComments = async () => {
      try {
        const response = await getEventComments(eventDetails.id);
        if (response.status === 200) {
          console.log(response.data);
          setAllComments(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllComments();
  }, [changesOn]);

  const handleCommentPosting = async (parentId: string | null = null) => {
    if (!comment) return;
    try {
      setEvent((prevEvent) => {
        if (!prevEvent) return null;
        return {
          ...prevEvent,
          comments: prevEvent.comments + 1,
        };
      });
      const response = await postComment(eventDetails.id, comment, parentId);
      if (response.status === 200) {
        setComment("");
        setChangesOn(changesOn + 1);
        setReplayDetails(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReplay = (parantId: string, parantUser: string) => {
    setReplayDetails({ parantId, parantUser:`@${parantUser}` });
  };

  const handleCommentDelete = async (commentId: string) => {
    try {
      setEvent((prevEvent) => {
        if (!prevEvent) return null;
        return {
          ...prevEvent,
          comments: prevEvent.comments - 1,
        };
      });

      const response = await deleteComment(commentId);

      if (response.status === 200) {
        setChangesOn(changesOn + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleComentOprions = (id: string) => {
    if (openComentOptions === id) {
      setComentOptions("");
    } else {
      setComentOptions(id);
    }
  };

  const userComments =
    allComments?.filter((item) => item.CommentedBy.id === userId) ?? [];
  const otherComments =
    allComments?.filter((item) => item.CommentedBy.id !== userId) ?? [];
  const listComments = [...userComments, ...otherComments];

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
              {allComments ? (
                <>
                  {allComments.length > 0 ? (
                    <ul role="list" className="divide-y divide-gray-100">
                      {listComments?.map((item, index) => (
                        <li
                          key={index}
                          className="flex justify-between gap-x-6 py-5"
                        >
                          <div className="flex min-w-0 gap-x-4">
                            <img
                              alt=""
                              src={item.CommentedBy.image || profileAvtar}
                              className="size-8 flex-none rounded-full bg-gray-50"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm text-gray-400">
                                <span className="text-base font-normal text-gray-200 cursor-pointer">
                                  {`${item.CommentedBy.firstName} ${item.CommentedBy.lastName}`}{" "}
                                </span>
                                {item.comment}
                              </p>
                              <div className="flex gap-4 cursor-pointer">
                                <p className="text-xs/5 text-gray-400">
                                  {formatDistanceToNow(
                                    new Date(item.createdAt),
                                    {
                                      addSuffix: true,
                                    }
                                  )}
                                </p>
                                <p
                                  onClick={() =>
                                    handleReplay(
                                      item.id,
                                      `${item.CommentedBy.firstName}`
                                    )
                                  }
                                  className="text-xs/5 text-gray-400 "
                                >
                                  Replay
                                </p>
                              </div>
                            </div>
                          </div>
                          {userId === item.CommentedBy.id ||
                          userId === item.CommentedEvent.hostsId ? (
                            <div className="shrink-0 sm:flex sm:flex-col sm:items-end cursor-pointer">
                              <>
                                <div>
                                  <svg
                                    onClick={() => toggleComentOprions(item.id)}
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

                                  {openComentOptions === item.id && (
                                    <div
                                      id="dropdownLeftEnd"
                                      className="z-10 absolute right-8 divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700 divide-gray-600"
                                    >
                                      <ul
                                        className="py-2 text-sm list-none text-gray-200"
                                        aria-labelledby="dropdownLeftEndButton"
                                      >
                                        <li>
                                          <a
                                            onClick={() =>
                                              handleCommentDelete(item.id)
                                            }
                                            className="block no-underline px-4 py-2 text-gray-200 hover:bg-gray-600 hover:text-white cursor-pointer"
                                          >
                                            delete
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </>
                            </div>
                          ) : (
                            <></>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <>
                      <div className="flex flex-col w-full justify-center items-center p-6">
                        <h2>No comments yet.</h2>
                        <p className="text-sm text-gray-200">
                          Start the conversation.
                        </p>
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
            <hr className="border-t border-gray-600" />
            {/* Modal footer */}
            <div className="border-t rounded-b border-gray-600">
              {replayDetails === null ? (
                <div className="flex justify-bitween">
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="block w-full  ps-10 text-sm rounded-lg bg-transparent placeholder-gray-400 text-white border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
                    placeholder="Add a comment..."
                    required
                  />
                  <button
                    type="submit"
                    onClick={() => handleCommentPosting()}
                    className={`end-2.5 bottom-2.5 bg-transparent font-medium text-sm px-4 py-2 ${
                      comment
                        ? "text-blue-700 hover:text-white"
                        : "text-gray-400"
                    }`}
                  >
                    Post
                  </button>
                </div>
              ) : (
                <div className="flex justify-bitween">
                  <span className="text-sm pt-3 text-gray-200">{replayDetails.parantUser}</span>
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="block w-full ps-2 text-sm rounded-lg bg-transparent placeholder-gray-400 text-gray-200 border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
                    placeholder=""
                    required
                  />
                  <button
                    type="submit"
                    onClick={() => handleCommentPosting(replayDetails.parantId)}
                    className={`end-2.5 bottom-2.5 bg-transparent font-medium text-sm px-4 py-2 ${
                      comment
                        ? "text-blue-700 hover:text-white"
                        : "text-gray-400"
                    }`}
                  >
                    Post
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComments;
