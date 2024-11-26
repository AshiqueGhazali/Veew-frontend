// import * as React from 'react';
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

// function randomID(len:number) {
//   let result = '';
//   if (result) return result;
//   var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
//     maxPos = chars.length,
//     i;
//   len = len || 5;
//   for (i = 0; i < len; i++) {
//     result += chars.charAt(Math.floor(Math.random() * maxPos));
//   }
//   return result;
// }

// export function getUrlParams(
//   url = window.location.href
// ) {
//   let urlStr = url.split('?')[1];
//   return new URLSearchParams(urlStr);
// }

// export default function conferancePage() {
//       const roomID = getUrlParams().get('roomID') || randomID(5);
//       let myMeeting = async (element:any) => {

//         const userData = {name:"asss", profileImage:''}
//      // generate Kit Token
//       const appID = 902961434;
//       const serverSecret = "9ceb90ac69f6a86ae359870be68c9c8c";
//       const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),userData.name);
//       // const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5),userData.name);

//      // Create instance object from Kit Token.
//       const zp = ZegoUIKitPrebuilt.create(kitToken);
//       // start the call
//       zp.joinRoom({
//         container: element,
//         sharedLinks: [
//           {
//             name: 'copy link',
//             url:
//              window.location.protocol + '//' +
//              window.location.host + window.location.pathname +
//               '?roomID=' +
//               roomID,
//           },
//         ],
//         scenario: {
//           mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
//         },
//         userConfig: {
//           onUserAvatarUpdate: (user:any) => {
//             return userData.profileImage
//               ? `<img src="${userData.profileImage}" alt="User Avatar" />`
//               : `<div class="avatar">${userData.name.charAt(0).toUpperCase()}</div>`;
//           },
//         },
//       });

//   };

//   return (
//     <div
//       className="myCallContainer"
//       ref={myMeeting}
//       style={{ width: '100vw', height: '100vh' }}
//     ></div>
//   );
// }

import * as React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store/store";
import { getUserProfileData } from "../../../api/user";
import { IUser } from "../../../interface/userInterface";
import { useNavigate } from "react-router-dom";

function randomID(len: number) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
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

export default function App() {
  const idOfUser = useSelector((state: RootState) => state.user.userData.id);
  const [userData, setUserData] = React.useState<IUser | null>(null);
  const navigate = useNavigate();

  const room = getUrlParams().get("roomID");
  const eventId = getUrlParams().get("eventId");

  if (!room && !eventId) {
    // navigate('/profile/events')
    return (
      <div className="flex flex-col items-center justify-center h-[100vh]">
        <h1>Event Not Found</h1>
        <button
          type="button"
          onClick={()=>navigate('/profile/events')}
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          BACK TO EVENTS
        </button>
      </div>
    );
  }

  if (eventId) {
  }
  React.useEffect(() => {
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
  }, [idOfUser]);

  const roomID = room || randomID(5);
  const userID = userData?.id || "";
  const userName = `${userData?.firstName} ${userData?.lastName}`;
  let myMeeting = async (element: HTMLDivElement) => {
    // generate token
    const token = await generateToken(
      "https://preview-uikit-server.zegotech.cn/api/token",
      2013980891,
      userID
    );

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
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}
