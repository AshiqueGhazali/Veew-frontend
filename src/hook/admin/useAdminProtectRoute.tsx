import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store/store";
import { Navigate } from "react-router-dom";

const UseAdminRouteProtect = () => {
  const adminStatus = useSelector(
    (state: RootState) => state.admin.Admin.status
  );

  if (!adminStatus) {
    return <Navigate to={"/admin/login"} replace />;
  }

  return null;
};

export default UseAdminRouteProtect;
