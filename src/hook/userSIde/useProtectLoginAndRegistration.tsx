import { useNavigate } from "react-router-dom";
import { getToken } from "../../api/user";
import { login } from "../../Redux/slice/userAuthSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const UseProtectLoginAndRegistration = async () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [loginStatus , setStatus] = useState<boolean>(false)
  const status = JSON.parse(localStorage.getItem("isLogin") || '')

  if(status){
    let response = await getToken();
    setStatus(response.data.status)
  }


  if (loginStatus) {
    dispath(login(loginStatus));
    navigate("/");
  }


  return;
};

export default UseProtectLoginAndRegistration;
