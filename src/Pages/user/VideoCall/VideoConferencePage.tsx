import React, { useState, useEffect } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store/store";
import {
  getUserProfileData,
  setEventEndTime,
  startEvent,
  verifyEventJoining,
} from "../../../api/user";
import { IUser } from "../../../interface/userInterface";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

function randomID(len: number = 7): string {
  const chars =
    "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// get token
function generateToken(tokenServerUrl: string, appID: number, userID: string) {
  // Obtain the token interface provided by the App Server
  return fetch(tokenServerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      app_id: appID,
      user_id: userID,
    }),
  }).then(async (res) => {
    const result = await res.text();
    return result;
  });
}

export function getUrlParams(
  url: string = window.location.href
): URLSearchParams {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

const handleEventStart = async (eventId: string) => {
  try {
    const startTime = new Date().toISOString();
    await setEventEndTime(eventId, startTime);
    console.log("Start time recorded successfully");
  } catch (error) {
    console.error("Failed to record start time:", error);
  }
};

const handleEventEnd = async (eventId: string) => {
  try {
    const endTime = new Date().toISOString();
    await setEventEndTime (eventId, endTime);
    console.log("End time recorded successfully");
  } catch (error) {
    console.error("Failed to record end time:", error);
  }
};

const videoConference: React.FC = () => {
  const idOfUser = useSelector((state: RootState) => state.user.userData.id);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [status, setStatus] = useState({
    status: false,
    message: "Loading...",
  });
  const [roomURL, setRoomURL] = useState<string>(randomID(7));
  const navigate = useNavigate();

  const room = getUrlParams().get("roomID");
  const eventId = getUrlParams().get("eventId");

  useEffect(() => {
    const fetchUserData = async () => {
      if (idOfUser) {
        try {
          const response = await getUserProfileData(idOfUser);
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

    if (eventId) {
      const getStartEvent = async () => {
        try {
          const response = await startEvent(eventId);
          if (response.status === 200) {
            // toast.success("event starting...");
            setStatus({ status: true, message: "OK" });
            setRoomURL(response.data.eventMeetUrl);
            await handleEventStart(eventId)
          }
        } catch (error: any) {
          if (error.response.status === 400 || error.response.status === 401) {
            setStatus({ status: false, message: error.response.data.message });
          }
        }
      };

      getStartEvent();
    }

    if (!room && !eventId) {
      setStatus({ status: false, message: "Event Not Found" });
    }

    if (room) {
      const verifyJoining = async () => {
        try {
          const response = await verifyEventJoining(room);

          if (response.status === 200) {
            setStatus({ status: true, message: "ticket conformed" });
          }
        } catch (error: any) {
          if (error.response.status === 500) {
            setStatus({ status: false, message: "server error" });
            return;
          }
          setStatus({ status: false, message: error.response.data.message });
        }
      };

      verifyJoining();
    }
  }, [idOfUser]);

  const roomID = room || roomURL;
  const userID = userData?.id || "";
  const userName = `${userData?.firstName} ${userData?.lastName}`;
  let myMeeting = async (element: HTMLDivElement) => {
    // generate token
    const token = await generateToken(
      "https://preview-uikit-server.zegotech.cn/api/token",
      2013980891,
      userID
    );

    const avatar =
      userData?.image ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        userData?.firstName || "U"
      )}&background=random`;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
      2013980891,
      token,
      roomID,
      userID,
      userName
    );
    // create instance object from token
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // start the call
    zp.joinRoom({
      container: element,
      showPreJoinView: false,
      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.origin +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
      onLeaveRoom:async()=>{
        window.location.href = 'http://localhost:5173/events';
        if(eventId){
          await handleEventEnd(eventId)
        }
      }
    });

  
  };

  if (status.status) {
    return (
      <div
        className="myCallContainer"
        ref={myMeeting}
        style={{ width: "100vw", height: "100vh" }}
      ></div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-[100vh]">
        <h1>{status.message}</h1>
        <button
          type="button"
          onClick={() => navigate("/profile/events")}
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          BACK TO EVENTS
        </button>
      </div>
    );
  }
};

export default videoConference;
