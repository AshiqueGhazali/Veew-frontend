
import { useDispatch } from "react-redux";
import { adminGetToken } from "../../api/admin";
import { useNavigate } from "react-router-dom";
import { adminlogin } from "../../Redux/slice/adminAuthSlice";

interface adminGetTokenResponse {
    data: {
      status: boolean;
      decoded: object;
    };
  }

const UseAdminRouteProtect = () => {

   const navigate = useNavigate();
   const dispatch = useDispatch()


  const hadnleFunciton = async () => {
    try {
      let response: adminGetTokenResponse = await adminGetToken();
      
      if (!response.data.status) {
        navigate("/admin/login");
      }else{
        dispatch(adminlogin())
      }
    } catch (error) {
      navigate("/admin/login");
    }
  };
  hadnleFunciton();

  return 
};

export default UseAdminRouteProtect;