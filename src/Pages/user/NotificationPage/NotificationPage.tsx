import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { INotifications } from "../../../interface/notificationInterface";
import { getNotifications } from "../../../api/user";


  

const NotificationPage: React.FC = () => {
    const [notifications, setNotifications] = useState<INotifications[] | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [notificationPerPage] = useState(5);


    useEffect(()=>{
        const getAllNotifications = async()=>{
            try {
                const response = await getNotifications()

                if(response.status===200){                    
                    setNotifications(response.data)
                }
            } catch (error) {
                console.log(error);
            }
        }

        getAllNotifications()
    },[])

    const totalNotifications = notifications?.length || 0;
    const totalPages = Math.ceil(totalNotifications/notificationPerPage)
    const startIndex = (currentPage-1) * notificationPerPage;
    const endIndex = startIndex + notificationPerPage;
    const paginatedNotifications = notifications?.slice(startIndex,endIndex)

    const handlePageChange = (page: number) => {
      if (page > 0 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
  return (
    <div>
      <ul role="list" className="divide-y divide-gray-100">
        {paginatedNotifications?.map((notification, index) => (
          <li key={index} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              {/* <img
                alt=""
                className="size-12 flex-none rounded-full bg-gray-50"
              /> */}
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900">
                  Transaction Successful!
                </p>
                <p className="mt-1 truncate text-xs/5 text-gray-500">
                  {notification.notification}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm/6 text-gray-900">
                {formatDistanceToNow(new Date(notification.createdAt), {
                  addSuffix: true,
                })}
              </p>
              <p className="mt-1 text-xs/5 text-gray-500">
                {new Date(notification.createdAt).toDateString()}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">{startIndex}</span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {endIndex < totalNotifications ? endIndex : totalNotifications}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {totalNotifications}
          </span>{" "}
          Notifications
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button onClick={()=>handlePageChange(currentPage - 1)} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Prev
          </button>
          <button onClick={()=>handlePageChange(currentPage + 1)} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
