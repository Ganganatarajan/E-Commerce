import { Link, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";

const MainLayout = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <div className="flex min-h-screen">
      <div className="w-64">
        <Sidebar />
      </div>

      <main className="flex-1 bg-gray-50 p-4">
        <Navbar />

        <div className="px-2 text-sm text-gray-500  mt-4">
          <nav className="flex items-center space-x-2">
            <Link to="/" className=" hover:underline">
              Home
            </Link>
            {pathnames.map((value, index) => {
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              const label = value.charAt(0).toUpperCase() + value.slice(1);
              return (
                <div key={to} className="flex items-center space-x-2">
                  <span>/</span>
                  <Link
                    to={to}
                    className="text-[#330066] font-semibold hover:underline"
                  >
                    {label}
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>

        <div className="mt-2">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
