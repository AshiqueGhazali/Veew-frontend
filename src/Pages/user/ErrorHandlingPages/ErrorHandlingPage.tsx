import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const ErrorHandlingPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const errorMessage = queryParams.get("errorMessage") || "Unexpected Error Occured!";
  const errorStatus = queryParams.get("errorStatus") || 404

  const navigate = useNavigate();

  const handleBack = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="p-8">
      <div onClick={() => navigate(-2)} className="text-[24px] md:text-[36px]">
        <IoArrowBackCircleOutline />
      </div>
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-center leading-[50px] md:leading-[90px]">
          ERROR
          <br />
          <span className="text-[5rem] md:text-[10rem] cursor-pointer">
            {errorStatus}
          </span>
        </h1>
        <h1 className="md:-mt-6 text-center  text-[18px] md:text-[24px]">
          Internal Server Error
        </h1>
        <p className="text-center">{errorMessage}</p>
        <button
          onClick={handleBack}
          type="button"
          className="text-white mt-4 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-10 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
        >
          BACK TO HOME
        </button>
      </div>
    </div>
  );
};

export default ErrorHandlingPage;
