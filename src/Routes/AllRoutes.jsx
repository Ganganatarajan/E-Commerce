import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";

const AllRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
    
    </Routes>
  );
};

export default AllRoutes;
