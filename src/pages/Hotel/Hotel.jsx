import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { GetHotel } from "../../Services/Hotel";
const Hotel = () => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([
    {
      id: 1,
      hotelName: "Paradise Hotel",
      contactPerson: "John Doe",
      mobileNumber: "9876543210",
      city: "New York",
      area: "Manhattan",
      verified: true,
    },
    {
      id: 2,
      hotelName: "Sunshine Residency",
      contactPerson: "Jane Smith",
      mobileNumber: "8765432109",
      city: "Los Angeles",
      area: "Downtown",
      verified: false,
    },
    {
      id: 3,
      hotelName: "Sunshine Residency",
      contactPerson: "Jane Smith",
      mobileNumber: "8765432109",
      city: "Los Angeles",
      area: "Downtown",
      verified: false,
    },
    {
      id: 4,
      hotelName: "Sunshine Residency",
      contactPerson: "Jane Smith",
      mobileNumber: "8765432109",
      city: "Los Angeles",
      area: "Downtown",
      verified: false,
    },
    {
      id: 5,
      hotelName: "Sunshine Residency",
      contactPerson: "Jane Smith",
      mobileNumber: "8765432109",
      city: "Los Angeles",
      area: "Downtown",
      verified: false,
    },
  ]);

  const filteredData = hotels.filter((item) =>
    [item.hotelName, item.contactPerson, item.mobileNumber, item.city, item.area].some((field) =>
      field && field.toString().toLowerCase().includes(search.toLowerCase())
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

  const toggleVerified = (id) => {
    setHotels(
      hotels.map((hotel) =>
        hotel.id === id ? { ...hotel, verified: !hotel.verified } : hotel
      )
    );
  };

  const deleteHotel = (id) => {
    setHotels(hotels.filter((hotel) => hotel.id !== id));
  };

  const navigateToAdd = () => {
    navigate("/hotel/add");
  };

    const getHotel = async() =>{
        try {
          const res = await GetHotel();
          console.log(res.data,'get hotel')
        } catch (error) {
          console.error(error)
        }
      };
    
      useEffect(()=>{
        getHotel();
      },[])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="text"
            placeholder="Search by name, phone, city, or area"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
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
          onClick={navigateToAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add Hotel
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  S.No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Hotel Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contact Person
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Mobile
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  City
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Area
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Verified
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
             {currentData.map((hotel, index) => (
                <tr key={hotel.id} className="hover:bg-gray-50">
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {(currentPage - 1) * rowsPerPage + index + 1}
      </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {hotel.hotelName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {hotel.contactPerson}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {hotel.mobileNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {hotel.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {hotel.area}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleVerified(hotel.id)}
                      className={`px-3 py-1 text-xs font-semibold rounded-full transition duration-300 ${
                        hotel.verified
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      {hotel.verified ? "Verified" : "Unverified"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
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
                      <button className="text-yellow-600 hover:text-yellow-900">
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
                        onClick={() => deleteHotel(hotel.id)}
                        className="text-red-600 hover:text-red-900"
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
          {/* Professional Pagination */}
      {filteredData.length > 0 && totalPages > 1 && (
        <div className="flex justify-end mt-2 items-center space-x-2 p-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-2 py-1 rounded-lg border text-sm font-medium ${currentPage === 1
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
              className={`px-2 py-1 rounded-lg text-sm font-medium border ${page === currentPage
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
            className={`px-2 py-1 rounded-lg border text-sm font-medium ${currentPage === totalPages
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

export default Hotel;
