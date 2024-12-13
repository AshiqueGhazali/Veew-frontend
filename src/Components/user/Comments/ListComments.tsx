import React, { useEffect, useState } from "react";
import IComments from "../../../interface/CommentsInterface";
import {
  deleteComment,
  getEventComments,
  postComment,
} from "../../../api/user";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import profileAvtar from "../../../assets/man-profile.jpeg";
import { formatDistanceToNow } from "date-fns";

interface ICommentsProps {
  eventId: string;
  userId: string;
  isDark?: boolean;
  totalComments?: number;
  setTotalComments?: (total: number) => void;
}
interface replay {
  parantId: string;
  parantUser: string;
}
const ListComments: React.FC<ICommentsProps> = ({
  eventId,
  userId,
  isDark,
  totalComments,
  setTotalComments,
}) => {
  const [comment, setComment] = useState("");
  const [changesOn, setChangesOn] = useState<number>(0);
  const [allComments, setAllComments] = useState<IComments[] | null>(null);
  const [openComentOptions, setComentOptions] = useState<string>("");
  const [replayDetails, setReplayDetails] = useState<replay | null>(null);
  const [isReplayShowing, setReplayShow] = useState<string>("");

  const toggleComentOprions = (id: string) => {
    if (openComentOptions === id) {
      setComentOptions("");
    } else {
      setComentOptions(id);
    }
  };

  useEffect(() => {
    const getAllComments = async () => {
      try {
        const response = await getEventComments(eventId);
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
      if(totalComments && setTotalComments)setTotalComments(totalComments + 1);
      const response = await postComment(eventId, comment, parentId);
      if (response.status === 200) {
        setComment("");
        setChangesOn((prev) => prev + 1);
        setReplayDetails(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentDelete = async (commentId: string) => {
    console.log(`Deleting comment with ID: ${commentId}`);

    try {
        if(totalComments && setTotalComments)setTotalComments(totalComments - 1);
        const response = await deleteComment(commentId);

      if (response.status === 200) {
        setChangesOn(changesOn + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReplay = (parantId: string, parantUser: string) => {
    setReplayDetails({ parantId, parantUser: `@${parantUser}` });
  };

  const userComments =
    allComments?.filter((item) => item.CommentedBy.id === userId) ?? [];
  const otherComments =
    allComments?.filter((item) => item.CommentedBy.id !== userId) ?? [];
  const listComments = [...userComments, ...otherComments];
  return (
    <>
      <div
        className={`p-4 md:p-5 space-y-4 ${
          isDark ? "max-h-[200px] overflow-y-scroll" : ""
        }`}
      >
        {allComments ? (
          <>
            {allComments.length > 0 ? (
              <ul role="list" className="divide-y list-none divide-gray-100">
                {listComments?.map((item, index) => (
                  <li key={index}>
                    <div className="flex justify-between gap-x-6 py-5">
                      <div className="flex min-w-0 gap-x-4">
                        <img
                          alt=""
                          src={item.CommentedBy.image || profileAvtar}
                          className="size-8 flex-none rounded-full bg-gray-50"
                        />
                        <div className="min-w-0 flex-auto">
                          <p
                            className={`text-sm ${
                              isDark ? "text-gray-400" : "text-gray-800"
                            }`}
                          >
                            <span
                              className={`text-base font-normal cursor-pointer ${
                                isDark ? "text-gray-200" : "text-gray-900"
                              }`}
                            >
                              {`${item.CommentedBy.firstName} ${item.CommentedBy.lastName}`}{" "}
                            </span>
                            {item.comment}
                          </p>
                          <div className="flex gap-4 cursor-pointer">
                            <p
                              className={`text-xs/5 ${
                                isDark ? "text-gray-400" : "text-gray-800"
                              }`}
                            >
                              {formatDistanceToNow(new Date(item.createdAt), {
                                addSuffix: true,
                              })}
                            </p>
                            <p
                              onClick={() =>
                                handleReplay(
                                  item.id,
                                  `${item.CommentedBy.firstName}`
                                )
                              }
                              className={`text-xs/5 ${
                                isDark ? "text-gray-400" : "text-gray-800"
                              }`}
                            >
                              Replay
                            </p>
                          </div>
                        </div>
                      </div>
                      {userId === item.CommentedBy.id ||
                      userId === item.CommentedEvent.hostsId ? (
                        <Menu
                          as="div"
                          className="relative inline-block text-left"
                        >
                          <div>
                            <MenuButton
                              className={`inline-flex w-full justify-center gap-x-1.5  bg-transparent py-2 text-sm font-semibold ${
                                isDark ? "text-white" : "text-black"
                              }`}
                            >
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
                            </MenuButton>
                          </div>

                          <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                          >
                            <div className="py-1">
                              <MenuItem>
                                <a
                                  onClick={() => handleCommentDelete(item.id)}
                                  className="block px-4 py-2 no-underline text-sm text-gray-100 data-[focus]:bg-gray-700 data-[focus]:text-gray-200 data-[focus]:outline-none"
                                >
                                  Delete
                                </a>
                              </MenuItem>
                            </div>
                          </MenuItems>
                        </Menu>
                      ) : (
                        <></>
                      )}
                    </div>
                    {item.replies.length > 0 ? (
                      <div className="pl-10">
                        {isReplayShowing === item.id ? (
                          <>
                            <p
                              onClick={() => setReplayShow("")}
                              className="flex text-xs text-gray-400 pl-10 cursor-pointer"
                            >
                              - hide replays
                            </p>
                            <div className="">
                              {/* <Comments
                            comments={item.replies.flat()}
                            userId={userId}
                            handleReplay={handleReplay}
                            handleCommentDelete={handleCommentDelete}
                          /> */}
                              <>
                                <ul
                                  role="list"
                                  className="divide-y list-none divide-gray-100"
                                >
                                  {item.replies?.map((single, ind) => (
                                    <li key={ind}>
                                      <div className="flex justify-between  py-5">
                                        <div className="flex min-w-0 gap-x-4">
                                          <img
                                            alt=""
                                            src={
                                              single.CommentedBy.image ||
                                              profileAvtar
                                            }
                                            className="size-6 flex-none rounded-full bg-gray-50"
                                          />
                                          <div className="min-w-0 flex-auto">
                                            <p className={`text-sm cursor-pointer ${isDark ? "text-gray-400":"text-gray-800"}`}>
                                              <span className={`text-sm font-normal  cursor-pointer ${isDark ? "text-gray-200" : "text-gray-600"}`}>
                                                {`${single.CommentedBy.firstName} ${single.CommentedBy.lastName}`}{" "}
                                              </span>
                                              {single.comment}
                                            </p>
                                            <div className="flex gap-4 cursor-pointer">
                                              <p className={`text-xs ${isDark ? "text-gray-400":"text-gray-800"}`}>
                                                {formatDistanceToNow(
                                                  new Date(single.createdAt),
                                                  {
                                                    addSuffix: true,
                                                  }
                                                )}
                                              </p>
                                              <p
                                                onClick={() =>
                                                  handleReplay(
                                                    single.id,
                                                    `${single.CommentedBy.firstName}`
                                                  )
                                                }
                                                className={`text-xs ${isDark ? "text-gray-400":"text-gray-800"}`}
                                              >
                                                Replay
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        {userId === single.CommentedBy.id ||
                                        userId ===
                                          single.CommentedEvent.hostsId ? (
                                          <>
                                            <Menu
                                              as="div"
                                              className="relative inline-block text-left"
                                            >
                                              <div>
                                                <MenuButton className={`inline-flex w-full justify-center gap-x-1.5 bg-transparent py-2 text-sm font-semibold ${isDark ? "text-white":"text-black"}`}>
                                                  <svg
                                                    onClick={() =>
                                                      toggleComentOprions(
                                                        single.id
                                                      )
                                                    }
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
                                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                              >
                                                <div className="py-1">
                                                  <MenuItem>
                                                    <a
                                                      onClick={() =>
                                                        handleCommentDelete(
                                                          single.id
                                                        )
                                                      }
                                                      className="block px-4 py-2 no-underline text-sm text-gray-100 data-[focus]:bg-gray-700 data-[focus]:text-gray-200 data-[focus]:outline-none"
                                                    >
                                                      Delete
                                                    </a>
                                                  </MenuItem>
                                                </div>
                                              </MenuItems>
                                            </Menu>
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            </div>
                          </>
                        ) : (
                          <p
                            onClick={() => setReplayShow(item.id)}
                            className="flex text-xs text-gray-400 pl-10 cursor-pointer"
                          >
                            - view replays
                          </p>
                        )}
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
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-200" : "text-gray-600"
                    }`}
                  >
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
      <div className="border-t rounded-b border-gray-600 pb-10">
        {replayDetails === null ? (
          <div className="flex justify-bitween">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={`block w-full  ps-10 text-sm rounded-lg bg-transparent border-transparent focus:outline-none focus:ring-0 focus:border-transparent ${
                isDark
                  ? " placeholder-gray-400 text-white"
                  : " placeholder-gray-800 text-black"
              }`}
              placeholder="Add a comment..."
              required
            />
            <button
              type="submit"
              onClick={() => handleCommentPosting()}
              className={`end-2.5 bottom-2.5 bg-transparent font-medium text-sm px-4 py-2 ${
                comment
                  ? `text-blue-700 ${
                      isDark ? "hover:text-white" : "hover:text-gray-900"
                    }`
                  : "text-gray-400"
              }`}
            >
              Post
            </button>
          </div>
        ) : (
          <div className="flex justify-bitween">
            <span
              className={`text-sm pt-3 ${
                isDark ? "text-gray-200" : "text-gray-600"
              }`}
            >
              {replayDetails.parantUser}
            </span>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={`block w-full ps-2 text-sm rounded-lg bg-transparent border-transparent focus:outline-none focus:ring-0 focus:border-transparent ${
                isDark
                  ? "placeholder-gray-400 text-gray-200"
                  : "placeholder-gray-800 text-gray-600"
              }`}
              placeholder=""
              required
            />
            <button
              type="submit"
              onClick={() => handleCommentPosting(replayDetails.parantId)}
              className={`end-2.5 bottom-2.5 bg-transparent font-medium text-sm px-4 py-2 ${
                comment
                  ? `text-blue-700 ${
                      isDark ? "hover:text-white" : "hover:text-gray-900"
                    }`
                  : "text-gray-400"
              }`}
            >
              Post
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ListComments;
