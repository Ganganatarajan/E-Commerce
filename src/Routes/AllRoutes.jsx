import { Routes, Route } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Hostel from "../pages/Hostel/Hostel";
import HostelForm from "../pages/Hostel/HostelForm";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="hostel" element={<Hostel />} />
        <Route path="hostel/add" element={<HostelForm/>}/>
      </Route>
    </Routes>
  );
};

export default AllRoutes;
