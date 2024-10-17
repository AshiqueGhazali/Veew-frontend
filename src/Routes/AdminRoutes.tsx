import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminLogin from "../Pages/admin/AdminLogin/AdminLogin";
import AdminDashboard from "../Pages/admin/AdminDashboard/AdminDashboard";

const AdminRoutes: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const currentRoute = localStorage.getItem("currentRoute") || "/";

    localStorage.setItem("prevRoute", currentRoute);
    localStorage.setItem("currentRoute", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/add-pricing" element={<AdminDashboard />} />
        <Route path="/*" element={<AdminDashboard />} />
        <Route path="/login" element={<AdminLogin />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
