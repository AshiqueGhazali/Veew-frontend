import React, { useEffect, useState } from "react";
import { IUser } from "../../../interface/userInterface";
import { getUserReports } from "../../../api/admin";
import UserReports from "../../../Components/admin/ReportManagementComponents/UserReports";
import EventReports from "../../../Components/admin/ReportManagementComponents/EventReports";

interface reportProps {
  searchQuery: string;
}

// Interface for each report received
interface IReport {
  reason: string;
  reporter: IUser;
}

// Interface for the reported user details
interface IReportedUser {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  reportsReceived: IReport[];
}

// State type for the frontend
type ReportedUsersState = IReportedUser[];

const ReportManagement: React.FC<reportProps> = ({ searchQuery }) => {
  const [reportedUsers, setReportedUsers] = useState<ReportedUsersState>([]);

  useEffect(() => {
    const getReports = async () => {
      try {
        const response = await getUserReports();

        if (response.status === 200) {
          setReportedUsers(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getReports();
  }, []);

  useEffect(() => {
    console.log(reportedUsers);
  }, [reportedUsers]);

  return (
    <div>
      <div className="mt-4">
        <UserReports searchQuery={searchQuery} />
      </div>
      <div className="mt-4">
        <EventReports searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default ReportManagement;
