import { Outlet } from "react-router";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar with fixed width */}
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Main content takes remaining space */}
      <main className="flex-1 bg-gray-50 p-4">
        {/* Navbar at the top */}
        <Navbar />

        {/* Page content below the navbar */}
        <div className="mt-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
