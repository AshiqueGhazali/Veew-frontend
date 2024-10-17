import React, { useEffect, useState } from "react";
import "./UserManagement.css";
import { getAllUsers, blockUser } from "../../../api/admin";
import { toast } from "react-toastify";

interface userData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age?: number;
  gender?: string;
  isBlock?: boolean;
  updatedAt: Date;
  createdAt: Date;
}

interface IUserManagementProp {
  search: string;
}

const UserManagement: React.FC<IUserManagementProp> = ({ search }) => {
  const [usersData, setUsersData] = useState<userData[] | null>(null);

  const getAllUser = async () => {
    try {
      const response = await getAllUsers();

      if (response.status === 200) {
        const users = response.data.map((user: any) => ({
          ...user,
          createdAt: new Date(user.createdAt),
        }));
        setUsersData(users);
      }
    } catch (error) {
      console.log("errrr", error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const handleblockUser = async (userId: string) => {
    try {
      console.log(userId);

      const response = await blockUser(userId);

      if (response.status === 200) {
        setUsersData(
          (prevUsers) =>
            prevUsers?.map((user) =>
              user.id === userId ? { ...user, isBlock: !user.isBlock } : user
            ) || null
        );
        toast.success("user status updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="list-table">
      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>Name</th>
            <th>Email</th>
            <th>Joined Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {usersData
            ?.filter((user) => {
              return (
                user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                user.lastName.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase())
              );
            })
            .map((user, index) => {
              return (
                <tr className={user.isBlock ? "blocked" : ""} key={index}>
                  <td>{index + 1}</td>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>{user.createdAt.toLocaleDateString()}</td>
                  <td>{user.isBlock ? "Blocked" : "Active"}</td>
                  <td>
                    <button
                      className="action-btn"
                      onClick={() => {
                        handleblockUser(user.id);
                      }}
                    >
                      {user.isBlock ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
