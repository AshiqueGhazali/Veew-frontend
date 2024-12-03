import React from "react";
import { IUser } from "../../../interface/userInterface";
import profileImage from '../../../assets/man-profile.jpeg'

interface NewUsersProps {
  people: IUser[] | null;
}

const NewUsers: React.FC<NewUsersProps> = ({ people }) => {
  return (
    <>
      <ul role="list" className="divide-y divide-gray-100">
        {people?.map((person) => (
          <li key={person.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              {/* {person.image ? (
                <img
                  alt=""
                  src={person.image}
                  className="size-12 flex-none rounded-full bg-gray-50"
                />
              ) : (
                <img src="" alt="" />
              )} */}
              <img
                  alt=""
                  src={person.image ? person.image : profileImage}
                  className="size-12 flex-none rounded-full bg-gray-50"
                />
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900">
                  {`${person.firstName} ${person.lastName}`}
                </p>
                <p className="mt-1 truncate text-xs/5 text-gray-500">
                  {person.email}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm/6 text-gray-900">JOINED DATE</p>
              <div className="mt-1 flex items-center gap-x-1.5">
                <p className="text-xs/5 text-gray-500">
                  {new Date(person.createdAt).toDateString()}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NewUsers;
