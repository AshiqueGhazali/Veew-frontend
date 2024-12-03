import React, { useEffect, useState } from "react";
import { getDataCounts } from "../../../api/user";

const StatsSection: React.FC = () => {
  const [status, setStatus] = useState({
    totalUsers: 0,
    totalExpairedEvents: 0,
    totalUpcomingEvents: 0,
    totalSubscribers: 0,
    totalTickets: 0,
  });
  useEffect(() => {
    const setAllDataCounts = async () => {
      try {
        const response = await getDataCounts();
        if (response.status === 200) {
          const {
            totalUsers,
            totalExpairedEvents,
            totalUpcomingEvents,
            totalSubscribers,
            totalTickets,
          } = response.data;
          setStatus({
            totalUsers,
            totalExpairedEvents,
            totalUpcomingEvents,
            totalSubscribers,
            totalTickets,
          });
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    setAllDataCounts();
  }, []);
  return (
    <section className=" py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Trusted by users worldwide
        </h2>
        <p className="text-gray-400 mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing possimus.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
        <div className="bg-[#666666] p-6 rounded-lg text-center text-white hover:bg-[#555555] cursor-pointer">
          <h3 className="text-2xl font-semibold">{status.totalUsers} +</h3>
          <p className="text-gray-200 mt-2">Users</p>
        </div>
        <div className="bg-[#666666] p-6 rounded-lg text-center text-white hover:bg-[#555555] cursor-pointer">
          <h3 className="text-2xl font-semibold">{status.totalSubscribers} +</h3>
          <p className="text-gray-200 mt-2">Hostes</p>
        </div>
        <div className="bg-[#666666] p-6 rounded-lg text-center text-white hover:bg-[#555555] cursor-pointer">
          <h3 className="text-2xl font-semibold">{status.totalExpairedEvents} +</h3>
          <p className="text-gray-200 mt-2">Events Finished</p>
        </div>
        <div className="bg-[#666666] p-6 rounded-lg text-center text-white hover:bg-[#555555] cursor-pointer">
          <h3 className="text-2xl font-semibold">{status.totalUpcomingEvents}</h3>
          <p className="text-gray-200 mt-2">{status.totalUpcomingEvents>1 ? 'Upcoming Events' : 'Upcoming Event'}</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
