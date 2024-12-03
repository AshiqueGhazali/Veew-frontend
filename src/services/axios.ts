import axios, { AxiosInstance } from "axios";

const Api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});


Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      console.error("Status Code:", error.response.status);

      if (error.response.status === 401 || error.response.status === 400) {
        console.error("Unauthorized access - maybe redirect to login?");
      } else if (error.response.status === 403) {
        const errorMessage = error.response.data.message || "Forbidden - user doesn't have permissions.";
        window.location.href = `/error?errorMessage=${encodeURIComponent(errorMessage)}&errorStatus=${error.response.status}`;
      } else if (error.response.status === 404) {
        const errorMessage = error.response.data.message || "Resource not found.";
        window.location.href = `/error?errorMessage=${encodeURIComponent(errorMessage)}&errorStatus=${error.response.status}`;
      } else if(error.response.status === 500){
        const errorMessage = error.response.data.message || "Internal Server Error occurred.";
        window.location.href = `/error-500?errorMessage=${encodeURIComponent(errorMessage)}`;
      } else {
        console.error("An error occurred:", error.response.data.message || "Unknown error");
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }

    return Promise.reject(error);
  }
);

export default Api;
