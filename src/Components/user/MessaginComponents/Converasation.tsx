import React, { useEffect, useState } from "react";
import IConverasation from "../../../interface/chatingInteface";
import { IUser } from "../../../interface/userInterface";
import { getUserDataById } from "../../../api/user";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store/store";
import profileAvtar from "../../../assets/man-profile.jpeg";

type Props = {
  data: IConverasation;
  onlineStatus: boolean;
};

const Converasation: React.FC<Props> = ({ data, onlineStatus}) => {
  const userId = useSelector((state: RootState) => state.user.userData.id);
  const [userData, setUserData] = useState<IUser>();
  useEffect(() => {
    const handelFn = async () => {
      try {
        const otherUserId =
          data.firstUserId !== userId ? data.firstUserId : data.secondUserId;

        const response = await getUserDataById(otherUserId);
        console.log(response.data.userData);
        setUserData(response.data.userData);
      } catch (error) {
        console.log(error);
      }
    };

    handelFn();
  }, []);

  return (
    <>
      <li key={userData?.email} className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <img
            alt=""
            src={userData?.image ? userData.image : profileAvtar}
            className="size-12 flex-none rounded-full bg-gray-50"
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm/6 font-semibold text-gray-900 cursor-pointer">{`${userData?.firstName} ${userData?.lastName}`}</p>
            {onlineStatus && (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="size-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs/5 text-gray-500 cursor-pointer">Online</p>
              </div>
            )}
          </div>
        </div>
      </li>
    </>
  );
};

export default Converasation;
