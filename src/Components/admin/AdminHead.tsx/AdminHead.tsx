import React, { useEffect, useState } from "react";
import "./AdminHead.css";
import { MdOutlineSubscriptions } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { IoPricetagsSharp } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { getDataCounts } from "../../../api/admin";

enum headers {
  Dashboard = "Dashboard",
  UserManagement = "User Management",
  PricingMangement = "Pricing Management",
  EventManagement = "Event Management",
  TicketManagement = "Ticket Management",
}

interface IDataCount {
  totalUsers:number;
  totalEvents:number;
  totalSubscribers:number;
  totalTickets:number
}

interface AdminHeadProps {
  setSearch: (search: string) => void;
}
const AdminHead: React.FC<AdminHeadProps> = ({ setSearch }) => {
  const [head, setHead] = useState<headers>(headers.Dashboard);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dataCounts, setDataCounts] = useState<IDataCount>({
    totalUsers: 0,
    totalEvents: 0,
    totalSubscribers: 0,
    totalTickets: 0,
  });
  const location = useLocation();

  useEffect(()=>{
    const setAllDataCounts = async()=>{
      try {
        const response = await getDataCounts()
        if(response.status===200){
          const {totalUsers, totalExpairedEvents , totalUpcomingEvents , totalSubscribers, totalTickets}= response.data
          setDataCounts({
            totalUsers,
            totalEvents:totalExpairedEvents+totalUpcomingEvents,
            totalSubscribers,
            totalTickets
          })
        }
      } catch (error:any) {
        console.log(error);
        
      }
    }

    setAllDataCounts()
  },[])

  useEffect(() => {
    if (location.pathname === "/admin/") {
      setHead(headers.Dashboard);
    } else if (location.pathname === "/admin/user-management") {
      setHead(headers.UserManagement);
    } else if (location.pathname === "/admin/pricing-management") {
      setHead(headers.PricingMangement);
    } else if (location.pathname === "/admin/event-management") {
      setHead(headers.EventManagement);
    } else if (location.pathname === "/admin/ticket-management") {
      setHead(headers.TicketManagement);
    }
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setSearch(value);
  };
  return (
    <div>
      <div className="dashboard-head">
        <div className="head-text">
          <h2>{head}</h2>
        </div>
        <div className="admin-search-input">
          <label>Search...</label>
          <input
            id="search"
            type="search"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
            autoFocus
            required
          />
          <button type="submit" onClick={() => setSearch(searchQuery)}>
            Go
          </button>
        </div>
      </div>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="icon">
            <FaUsers />
          </div>
          <div>
            <h4>Users</h4>
            <p>{dataCounts.totalUsers}</p>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="icon" style={{ background: "#67cadf" }}>
            <MdOutlineSubscriptions />
          </div>
          <div>
            <h4>Subscriptions</h4>
            <p>{dataCounts.totalSubscribers}</p>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="icon" style={{ background: "#d1e046" }}>
            <SiGoogleclassroom />
          </div>
          <div>
            <h4>Events</h4>
            <p>{dataCounts.totalEvents}</p>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="icon" style={{ background: "#f54f5f" }}>
            <IoPricetagsSharp />
          </div>
          <div>
            <h4>Tickets</h4>
            <p>{dataCounts.totalTickets}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHead;
