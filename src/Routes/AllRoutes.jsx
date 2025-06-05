import { Routes, Route } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Hostel from "../pages/Hostel/Hostel";
import HostelForm from "../pages/Hostel/HostelForm";
import PremiumTable from "../pages/PremiumAds/PremiumTable";
import PremiumForm from "../pages/PremiumAds/PremiumForm";
import CarouselForm from "../pages/CarouselAds/CarouselForm";
import CarouselTable from "../pages/CarouselAds/CarouselTable";
import Hotel from "../pages/Hotel/Hotel";
import HotelForm from "../pages/Hotel/HotelForm";
import User from "../pages/User/User";
import SkilledDirectors from "../pages/SkilledDirectors/SkilledDirectors";
import JobsTable from "../pages/Jobs/Jobs";
import EditHostelForm from "../pages/Hostel/EditHostel"
import ViewAdmin from '../pages/Admins/ViewAdmin';
import Admins from '../pages/Admins/ViewAdmin';
import AdminsForm from '../pages/Admins/ViewAdmin';

import Admins from "../pages/Admins/Admins";
import AdminsForm from "../pages/Admins/AdminsForm";
// import EditAdmin from '../pages/Admins/EditAdmin';


const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="hostel" element={<Hostel />} />
        <Route path="hostel/add" element={<HostelForm />} />
        <Route path="PremiumAds" element={<PremiumTable />} />
        <Route path="PremiumAds/Add" element={<PremiumForm />} />
        <Route path="CarouselAds" element={<CarouselTable />} />
        <Route path="CarouselAds/Add" element={<CarouselForm />} />
        <Route path="hotel" element={<Hotel />} />
        <Route path="hotel/add" element={<HotelForm />} />
        <Route path="User" element={<User />} />
        <Route path="SkilledDirectors" element={<SkilledDirectors />} />
        <Route path="jobs" element={<JobsTable />} />
        <Route path="/hostel/get/:id" element={<EditHostelForm />} />

        <Route path="Admins" element={<Admins />} />
        <Route path="Admins/add" element={<AdminsForm />} />
        <Route path="/Admins/view/:id" element={<ViewAdmin />} />
        {/* <Route path="/Admins/edit/:id" element={<EditAdmin />} /> */}

      </Route>
    </Routes>
  );
};

export default AllRoutes;
