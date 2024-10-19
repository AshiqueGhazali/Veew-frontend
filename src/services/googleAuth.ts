// utils/useGoogleAuth.js (or hooks/useGoogleAuth.js)
import { useGoogleLogin, TokenResponse } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { googleAuth } from "../api/user";
import { login } from "../Redux/slice/userAuthSlice";

const useGoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      try {
        const { access_token } = tokenResponse;
        const userInfoResponse = await axios.get(
          `https://www.googleapis.com/oauth2/v3/userinfo`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        const { email, given_name, family_name, picture } = userInfoResponse.data;

        const apiResponse = await googleAuth(
          email,
          given_name,
          family_name,
          picture
        );

        if (apiResponse.data.status === true) {
          dispatch(login(apiResponse.data.userData.id));
          navigate("/");
        }
      } catch (error) {
        console.log("Error during Google login", error);
      }
    },
    onError: () => {
      console.log("Error during Google login");
    },
  });

  return { googleLogin };
};

export default useGoogleAuth;
