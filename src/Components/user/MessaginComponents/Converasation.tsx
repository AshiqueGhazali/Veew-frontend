import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import IConverasation from "../../../interface/chatingInteface";
import { IUser } from "../../../interface/userInterface";
import { getUserDataById } from "../../../api/user";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store/store";
import { toast } from "react-toastify";

type Props = {
  data: IConverasation;
  onlineStatus:boolean;
  callback: (data:any) => void; 
};

const Converasation: React.FC<Props> = ({ data,onlineStatus,callback}) => {
  const userId = useSelector((state: RootState) => state.user.userData.id);
  const [userData, setUserData] = useState<IUser>();
  useEffect(() => {
    const handelFn=async()=>{
        try {          
          const otherUserId = data.firstUserId !== userId ? data.firstUserId : data.secondUserId
          
          const response=await getUserDataById(otherUserId);
          console.log(response.data)
          setUserData(response.data.userData);
        } catch (error) {
            console.log(error)
        }
    }

    handelFn()
   
  },[]);

  return (
    <div className="mx-5 bg-white border shadow-xl border-gray-500 rounded-md mt-1 mb-2 p-2" onClick={()=>callback(userData)}>
    <div className="w-ful h-auto flex">
      <Avatar
        alt="Remy Sharp"
        src={userData?.image}
        sx={{ width: 56, height: 56 }}
      />

      <div>
       <h1 className="font-medium mx-3 md:text-lg mt-1 text-black">{`${userData?.firstName} ${userData?.lastName}`}</h1>
       {onlineStatus && 
         <h1 className="text-green-500 text-md mx-3">online</h1>
       }
      </div> 
    </div>
  </div>




  );
};

export default Converasation;