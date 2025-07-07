import { message } from "antd";
import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:8001/v1",
  // baseURL: "https://viduthiiapi.whydev.in/v1",
});

apiInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("viduthiiadmintoken");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error Interceptor:", error);
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    if (response.data.token) {
      localStorage.setItem("viduthiiadmintoken", response.data.token);
    }
    return response;
  },
  (error) => {
    const errorMessage = error?.response?.data?.message;

    if (errorMessage === "Invalid Token") {
      localStorage.removeItem("viduthiiadmintoken");
      message.error("Your session has expired. Please log in again.");

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else if (errorMessage) {
      message.error(errorMessage);
    } else {
      message.error("Something went wrong!");
    }

    return Promise.reject(error);
  }
);

export default apiInstance;
