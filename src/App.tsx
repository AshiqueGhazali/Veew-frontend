import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom"; 
import UserRoutes from "./Routes/UserRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import Error500Page from "./Pages/user/ErrorHandlingPages/Error500Page";
import ErrorHandlingPage from "./Pages/user/ErrorHandlingPages/ErrorHandlingPage";


function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
      
        <Route path="/*" element={<UserRoutes />} />

        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/error-500" element={<Error500Page />} />
        <Route path="/error" element={<ErrorHandlingPage />} />
      </Routes>
    </>
  );
}

export default App;
