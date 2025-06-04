import { message } from "antd";
import axios from "axios";

const apiInstance = axios.create({
 baseURL: 'http://localhost:7055/v1',
});

// Request interceptor
apiInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("viduthiiadmintoken");
    config.headers.Authorization = `Bearer ${authToken}`;
    return config;
  },
  (error) => {
    console.error("Request Error Interceptor:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiInstance.interceptors.response.use(
  (response) => {
    console.log(response,"axios")
    
    if(response.data.token){
      localStorage.setItem("viduthiiadmintoken",response.data.token)
    }
    return response;
  },
  (error) => {
    if(error.response.data.message==="Invalid Token"){
      localStorage.removeItem("viduthiiadmintoken");
      message.error("Your session has expired. Please log in again to continue.");
    const interval=  setTimeout(()=>{
      window.location.href="/"
      },2000)
      return ()=>clearInterval(interval)

    }
    console.log(error.response.data.message,"axios")
    return Promise.reject(error);
  }
);

export default apiInstance;