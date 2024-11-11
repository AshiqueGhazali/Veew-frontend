import React, { useEffect, useRef, useState } from "react";
import "./AdminDashboard.css";
import SideBar from "../../../Components/admin/SideBar/SideBar";
import AdminFooter from "../../../Components/admin/AdminFooter/AdminFooter";
import UseAdminRouteProtect from "../../../hook/admin/useAdminProtectRoute";
import AdminHead from "../../../Components/admin/AdminHead.tsx/AdminHead";
import { Route, Routes } from "react-router-dom";
import UserManagement from "../../../Components/admin/UserManagement/UserManagement";
import PricingManagement from "../PricingManagement/PricingManagement";
import EventManagement from "../EventManagement/EventManagement";
import TicketManagement from "../TicketManagement/TicketManagement";

const AdminDashboard: React.FC = () => {
  const redirect = UseAdminRouteProtect();
  if (redirect) return redirect;

  const [isNearFooter, setIsNearFooter] = useState(false);
  const [searchQuery, setSearch] = useState<string>("");
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const footerTop = footerRef.current.offsetTop;
        const windowBottom = window.innerHeight + window.scrollY;

        if (windowBottom >= footerTop) {
          setIsNearFooter(true);
        } else {
          setIsNearFooter(false);
        }
      }
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="dashboard">
      <div className="admin-dashboard">
        <SideBar isNearFooter={isNearFooter} />
        <div className="dashboard-pages">
          <AdminHead setSearch={setSearch} />
          <div className="managements">
            <Routes>
              <Route path="/" />
              <Route
                path="user-management"
                element={<UserManagement search={searchQuery} />}
              />
              <Route
                path="pricing-management"
                element={<PricingManagement search={searchQuery} />}
              />
              <Route 
                path="event-management" 
                element={<EventManagement search={searchQuery}/>}
              />
              <Route path="ticket-management" element={<TicketManagement searchQuery={searchQuery}/>} />
            </Routes>
          </div>
        </div>
      </div>
      <div ref={footerRef}>
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminDashboard;
