
// import { useDispatch } from "react-redux";
// import { adminGetToken } from "../../api/admin";
// import { useNavigate, } from "react-router-dom";
// import { adminlogin } from "../../Redux/slice/adminAuthSlice";
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store/store';
import { Navigate} from 'react-router-dom';

// interface adminGetTokenResponse {
//     data: {
//       status: boolean;
//       decoded: object;
//     };
//   }

const UseAdminRouteProtect = () => {

  //  const navigate = useNavigate();
  //  const dispatch = useDispatch()


  // const hadnleFunciton = async () => {
  //   try {
  //     let response: adminGetTokenResponse = await adminGetToken();
      
  //     if (!response.data.status) {
  //       navigate("/admin/login");
  //     }else{
  //       dispatch(adminlogin())
  //     }
  //   } catch (error) {
  //     navigate("/admin/login");
  //   }
  // };
  // hadnleFunciton();
  const adminStatus = useSelector((state:RootState)=>state.admin.Admin.status)

    if (!adminStatus) {
        return <Navigate to={'/admin/login'} replace />; 
    }

    return null; 
};

export default UseAdminRouteProtect;