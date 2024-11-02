import React from 'react';

const StatsSection: React.FC = () => {
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
        <div className="bg-[#666666] p-6 rounded-lg text-center text-white hover:bg-[#555555]">
          <h3 className="text-2xl font-semibold">8,000+</h3>
          <p className="text-gray-200 mt-2">Users</p>
        </div>
        <div className="bg-[#666666] p-6 rounded-lg text-center text-white hover:bg-[#555555]">
          <h3 className="text-2xl font-semibold">3%</h3>
          <p className="text-gray-200 mt-2">Hostes</p>
        </div>
        <div className="bg-[#666666] p-6 rounded-lg text-center text-white hover:bg-[#555555]">
          <h3 className="text-2xl font-semibold">99.9%</h3>
          <p className="text-gray-200 mt-2">Events Finished</p>
        </div>
        <div className="bg-[#666666] p-6 rounded-lg text-center text-white hover:bg-[#555555]">
          <h3 className="text-2xl font-semibold">$70M</h3>
          <p className="text-gray-200 mt-2">Upcoming Events</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
