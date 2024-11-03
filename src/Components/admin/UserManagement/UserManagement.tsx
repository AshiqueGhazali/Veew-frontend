
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(5); 

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

  const handleBlockUser = async (userId: string) => {
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
        toast.success("User status updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // for setup paginationnn...
  const filteredUsers = usersData?.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil((filteredUsers?.length || 0) / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
          {currentUsers?.map((user, index) => {
            return (
              <tr className={user.isBlock ? "blocked" : ""} key={index}>
                <td>{indexOfFirstUser + index + 1}</td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>{user.createdAt.toLocaleDateString()}</td>
                <td>{user.isBlock ? "Blocked" : "Active"}</td>
                <td>
                  <button
                    className="action-btn"
                    onClick={() => handleBlockUser(user.id)}
                  >
                    {user.isBlock ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages)].map((_, pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => paginate(pageNumber + 1)}
              className={`page-btn ${
                currentPage === pageNumber + 1 ? "active" : ""
              }`}
            >
              {pageNumber + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserManagement;

