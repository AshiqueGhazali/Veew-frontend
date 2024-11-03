import React from "react";

interface EventCardProps {
  name: string;
  role: string;
  position: string;
  imageUrl: string;
}

const UserProfileEventCard: React.FC<EventCardProps> = ({name,role,position,imageUrl}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between sm:w-full">
    <div className="flex items-start space-x-4">
        <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <span className="text-xs text-green-700 bg-green-100 rounded-full px-2 py-0.5 inline-block mt-1">
                {role}
            </span>
            <p className="text-gray-500 text-sm mt-2">{position}</p>
        </div>
        <img
            src={imageUrl}
            alt={name}
            className="w-12 h-12 rounded-full"
        />
    </div>
    <div className="flex mt-4 border-t border-gray-200 pt-4 space-x-4 w-full justify-between sm:justify-start">
        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 4c2.21 0 4 1.79 4 4v8c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4V8c0-2.21 1.79-4 4-4h8M8 2C5.24 2 3 4.24 3 7v10c0 2.76 2.24 5 5 5h8c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H8m3 10.5h6v-1H11v1z" /></svg>
            <span>Email</span>
        </button>
        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011.13-.21c1.12.45 2.33.68 3.46.68a1 1 0 011 1V19a1 1 0 01-.89 1c-8.28 0-15-6.72-15-15A1 1 0 015 3h3.5a1 1 0 011 1c0 1.13.23 2.34.68 3.46a1 1 0 01-.21 1.13l-2.2 2.2z" /></svg>
            <span>Call</span>
        </button>
    </div>
</div>
  );
};

export default UserProfileEventCard;
