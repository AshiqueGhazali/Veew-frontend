import { useNavigate } from "react-router-dom";
import { getToken } from "../../api/user";
import { login } from "../../Redux/slice/userAuthSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const UseProtectLoginAndRegistration = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [loginStatus , setStatus] = useState<boolean>(false)
  const status = JSON.parse(localStorage.getItem("isLogin") || 'null')

  if(status){
    const isToken = async()=>{
      try {
        let response = await getToken();
        if(response.status===200){
          setStatus(true)
        }
      } catch (error) {
        console.log("cant go to landingggggg.......");        
      }
    }

    isToken()
  }


  if (loginStatus) {
    dispath(login(loginStatus));
    navigate("/");
  }


  return;
};

export default UseProtectLoginAndRegistration;
