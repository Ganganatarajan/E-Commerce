import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const data = [
  {
    id: 1,
    name: "Paradise Hostel",
    phone: "9876543210",
    city: "New York",
    area: "Manhattan",
  },
  {
    id: 2,
    name: "Sunshine Residency",
    phone: "8765432109",
    city: "Los Angeles",
    area: "Downtown",
  },
  {
    id: 3,
    name: "Moonlight Inn",
    phone: "7654321098",
    city: "Chicago",
    area: "Lincoln Park",
  },
  {
    id: 4,
    name: "Elite Stay",
    phone: "6543210987",
    city: "Houston",
    area: "Midtown",
  },
  {
    id: 5,
    name: "Royal Hostel",
    phone: "5432109876",
    city: "Phoenix",
    area: "Tempe",
  },
  {
    id: 6,
    name: "Green Leaf",
    phone: "4321098765",
    city: "San Diego",
    area: "La Jolla",
  },
  {
    id: 7,
    name: "Ocean View",
    phone: "3210987654",
    city: "Miami",
    area: "South Beach",
  },
  {
    id: 8,
    name: "City Comfort",
    phone: "2109876543",
    city: "Seattle",
    area: "Capitol Hill",
  },
  {
    id: 8,
    name: "City Comfort",
    phone: "2109876543",
    city: "Seattle",
    area: "Capitol Hill",
  },
  {
    id: 8,
    name: "City Comfort",
    phone: "2109876543",
    city: "Seattle",
    area: "Capitol Hill",
  },
  {
    id: 8,
    name: "City Comfort",
    phone: "2109876543",
    city: "Seattle",
    area: "Capitol Hill",
  },
  {
    id: 8,
    name: "City Comfort",
    phone: "2109876543",
    city: "Seattle",
    area: "Capitol Hill",
  },
  {
    id: 8,
    name: "City Comfort",
    phone: "2109876543",
    city: "Seattle",
    area: "Capitol Hill",
  },
  {
    id: 8,
    name: "City Comfort",
    phone: "2109876543",
    city: "Seattle",
    area: "Capitol Hill",
  },
];

const PremiumTable = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  const deleteHostel = (id) => {
    console.log("Delete hostel with ID:", id);
  };

  const filteredData = data.filter((item) =>
    [item.name, item.phone, item.city, item.area].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleRowsChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="p-2 bg-gray-50 ">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="text"
            placeholder="Search by name, phone, city, or area"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-1 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={handleRowsChange}
            className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {[5, 10, 15, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-[#330066] cursor-pointer text-white px-5 py-1 rounded-lg font-medium hover:bg-[#4b0082] transition"
          onClick={() => navigate("/premiumAds/Add")}
        >
          + Add New
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs font-semibold uppercase tracking-wide text-gray-600">
            <tr>
              <th className="px-4 py-4">S. No</th>
              <th className="px-4 py-4">Hostel Name</th>
              <th className="px-4 py-4">Phone Number</th>
              <th className="px-4 py-4">City</th>
              <th className="px-4 py-4">Area</th>
              <th className="px-4 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-4">{startIndex + index + 1}</td>
                  <td className="px-4 py-4 font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-4 py-4">{item.phone}</td>
                  <td className="px-4 py-4">{item.city}</td>
                  <td className="px-4 py-4">{item.area}</td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-3 text-lg">
                      <button className="text-blue-600 hover:text-blue-800">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-800 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => deleteHostel(item.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Professional Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-6 items-center space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-2 py-1 rounded-lg border text-sm font-medium ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-purple-100"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-2 py-1 rounded-lg text-sm font-medium border ${
                page === currentPage
                  ? "bg-purple-700 text-white px-2 py-1"
                  : "bg-white text-gray-700 hover:bg-purple-100 px-2 py-1 "
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 rounded-lg border text-sm font-medium ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-purple-100"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PremiumTable;
