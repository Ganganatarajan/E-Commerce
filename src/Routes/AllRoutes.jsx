import { Routes, Route } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Hostel from "../pages/Hostel/Hostel";
import HostelForm from "../pages/Hostel/HostelForm";
import PremiumTable from "../pages/PremiumAds/PremiumTable";
import PremiumForm from "../pages/PremiumAds/PremiumForm";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="hostel" element={<Hostel />} />
        <Route path="hostel/add" element={<HostelForm />} />
        <Route path="PremiumAds" element={<PremiumTable />} />
        <Route path="PremiumAds/Add" element={<PremiumForm />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
