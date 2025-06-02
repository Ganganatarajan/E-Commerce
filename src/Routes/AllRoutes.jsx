import { Routes, Route } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Hostel from "../pages/Hostel";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
      <Route path="/Hostel" element={<Hostel/>}>
      </Route>
      </Route>
    </Routes>
  );
};

export default AllRoutes;
