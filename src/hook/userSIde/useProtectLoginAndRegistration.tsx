import { useNavigate } from "react-router-dom";
import { getToken } from "../../api/user";
import { login } from "../../Redux/slice/userAuthSlice";
import { useDispatch } from "react-redux";


const UseProtectLoginAndRegistration = async () => {
  const dispath = useDispatch();
  const navigate = useNavigate();

  let response = await getToken();
  

  if (response.data.status) {
    dispath(login(response.data.decoded));
    navigate("/");
  }

  return;
};

export default UseProtectLoginAndRegistration;