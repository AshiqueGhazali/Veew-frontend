import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Redux/store/store.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <GoogleOAuthProvider clientId="150562050204-jicv6ufemg5ettmmmnkni03oe5h4p1jf.apps.googleusercontent.com" >
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </StrictMode>
  </BrowserRouter>
);
