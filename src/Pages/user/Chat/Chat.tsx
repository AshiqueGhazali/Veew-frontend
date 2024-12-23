import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaPlus, FaPaperPlane } from "react-icons/fa";
import Converasation from "../../../Components/user/MessaginComponents/Converasation";
import {
  getConverasations,
  getMessage,
  getUserDataById,
  getUserProfileData,
  storeMessage,
} from "../../../api/user";
import IConverasation, { IMessage } from "../../../interface/chatingInteface";
import { format } from "timeago.js";
// import { doctorGetConverasation } from "../../api/doctor";
import { io } from "socket.io-client";
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";
import { IoChatbubblesOutline } from "react-icons/io5";
import { IUser } from "../../../interface/userInterface";
import { RootState } from "../../../Redux/store/store";
import { useLocation } from "react-router-dom";
import BottomNavigation from "../../../Components/user/MessaginComponents/BottomNavigation";
import profileAvtar from "../../../assets/man-profile.jpeg"
import { IncomingMessages, OutGoingMessages } from "../../../Components/user/MessaginComponents/Messages";

interface OnlineUser {
  id: string;
  socketId: string;
}

const ChatingPage: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user.userData.id);
  const location = useLocation();
  const { state } = location;
  const conversationData = state?.conversationData;

  const [converasation, setConverasation] = useState<IConverasation[]>([]);
  const [currentChat, setCurrentChat] = useState<IConverasation | null>(
    conversationData ? conversationData : null
  );
  const [message, setMessage] = useState<IMessage[]>([]);
  const [otherUserProfile, setOtherUserProfile] = useState<IUser>();
  const [userProfile, setUserData] = useState<IUser>();
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  // const socket = useRef(io("http://localhost:3000"));
  const [messageUpdate, setMessageUpdate] = useState(1);
  const [text, setText] = useState("");

  const socket = useRef(io("http://localhost:3000"));
  


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
  }, [userId]);

const getOtherUser = async () => {
  try {
    const otherUserId =
      currentChat?.firstUserId !== userId
        ? (currentChat?.firstUserId as string)
        : (currentChat?.secondUserId as string);

    if (!otherUserId) return;

    const response = await getUserDataById(otherUserId);
    console.log(response.data.userData);
    setOtherUserProfile(response.data.userData);
  } catch (error) {
    console.log(error);
  }
};

console.log("Rendering............................")

  useEffect(() => {
    socket.current.emit("addUser", userId);
    console.log("current user is safsdfsd", currentChat);

    socket.current.on("getUsers", (datas) => {
      console.log(datas, "online users");
      setOnlineUsers(datas);
    });

    getOtherUser();

    return () => {
      socket.current.off("getUsers");
      socket.current.off("message-content");
      // socket.current.disconnect();
    };
  }, [currentChat]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getConverasations();
        setConverasation(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {

    const getMessages = async () => {
      if (!currentChat) return;

      const response = await getMessage(currentChat?.id as string);
      if (response.status === 200) {
        setMessage(response.data);
      }
    };
    getMessages();

  }, [currentChat]);

  const handleSubmit = async () => {
    if (text.trim() === "") {
      return;
    }

    const recieverId = currentChat?.firstUserId !== userId
        ? (currentChat?.firstUserId as string)
        : (currentChat?.secondUserId as string)

    try {
      const response = await storeMessage(
        currentChat?.id as string,
        userId as string,
        recieverId,
        text
      );

      if (response.status === 200) {
        setMessage((prevMessages) => [...prevMessages, response.data]);
        socket.current.emit("message", { message: response.data }, recieverId);
      }

      setMessageUpdate(messageUpdate + 1);

      setText("");
    } catch (error) {
      console.log("the errrorr issss :", error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);



useEffect(() => {
  const handleMessage = (data: any) => {
    setMessage((prevMessages) => [...prevMessages, data.message]);
  };

  socket.current.on("message-content", handleMessage);

  return () => {
    socket.current.off("message-content", handleMessage);
  };
}, [socket]);


  socket.current.on("lostUsers", (datas) => {
    setOnlineUsers(datas);
    setConverasation([...converasation]);
  });

  const isUserOnline = (id: string, users: OnlineUser[]): boolean => {
    return users.some((user) => user.id === id);
  };


  return (
    <>
      <div className="w-full p-2 md:container max-h-screen mx-auto bg-gray-200 rounded-md flex  md:p-10 gap-10">
        <div className="bg-white min-h-[650px] max-h-[650px] w-1/2 rounded-md">
          <div className="p-4">
            <h1 className="text-black text-2xl font-bold">Chats</h1>
          </div>
          <div className="relative p-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <IoSearchOutline className="w-6 h-6 text-gray-500 mx-5" />
            </div>
            <input
              type="text"
              className="block w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:border-black-500"
              placeholder="Search here"
            />
          </div>
          <div className="flow-root overflow-y-scroll max-h-[500px] scrollbar-none">
            <div className="px-6">
              <ul role="list" className="divide-y divide-gray-100">
                {converasation?.map((val, index) => (
                  <div onClick={() => setCurrentChat(val)} key={index}>
                    <Converasation
                      data={val}
                      onlineStatus={isUserOnline(
                        val.firstUserId === userId
                          ? val.secondUserId
                          : val.firstUserId,
                        onlineUsers
                      )}
                    />
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full bg-white rounded-md p-5 max-h-screen ">
          {currentChat ? (
            <>
              <div className="flex items-center mb-4 border-b pb-2">
                {isUserOnline(otherUserProfile?.id || "", onlineUsers) ? (
                  <div className="relative me-4">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={
                        otherUserProfile?.image
                          ? otherUserProfile.image
                          : profileAvtar
                      }
                      alt="profile image"
                    />
                    <span className="top-0 start-7 absolute w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                  </div>
                ) : (
                  <div className="relative me-4">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={
                        otherUserProfile?.image
                          ? otherUserProfile.image
                          : profileAvtar
                      }
                      alt="profile image"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">
                    {otherUserProfile?.firstName}
                  </h2>
                </div>
              </div>

              {/*  */}

              <div className="max-h-[450px] min-h-[450px] mt-1 rounded-md overflow-y-scroll p-2 bg-[#eee9e2]">
                {message && message.length > 0 ? (
                  message?.map((val, index) => (
                    <div ref={scrollRef} key={index}>
                      {userId !== val.senderId ? (
                        <IncomingMessages user={otherUserProfile} messages={val}/>
                      ) : (
                        <OutGoingMessages user={userProfile} messages={val}/>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500">
                    No messages yet
                  </div>
                )}
              </div>
              <div className="flex items-center p-4 bg-gray-100 shadow rounded-lg m-2">
                <button className="text-blue-500 p-2">
                  <FaPlus />
                </button>
                <InputEmoji
                  value={text}
                  onChange={setText}
                  cleanOnEnter
                  placeholder="Type a message"
                  inputClass="border border-black rounded-md"
                  shouldReturn={true}
                  shouldConvertEmojiToImage={false}
                />
                <button
                  className="text-white bg-blue-500 p-2 rounded-full ml-2"
                  onClick={handleSubmit}
                  type="submit"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-2/3  text-white">
              <IoChatbubblesOutline className="w-16 h-16 mb-4 text-gray-400" />
              <h1 className="text-xl text-black">Open any conversation</h1>
              <p className="mt-2  text-black">
                Select a chat to start messaging
              </p>
            </div>
          )}
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default ChatingPage;
