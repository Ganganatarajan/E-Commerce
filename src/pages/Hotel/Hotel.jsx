import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { GetHotel, GetIdHotel } from "../../Services/Hotel";

const Hotel = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotels, setHotels] = useState([]);

  const modalRef = useRef(null);

  const openModal = (hotelId) => {
    const hotel = hotels.find((h) => h._id === hotelId?.toString());
    setSelectedHotel(hotel);
    setIsOpen(true);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedHotel(null);
  };

  const nextImage = () => {
    setCurrentImageIndex(
      (prev) => (prev + 1) % selectedHotel.hotelImages.length
    );
  };

  const previousImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + selectedHotel.images.length) %
        selectedHotel.hotelImages.length
    );
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") closeModal();
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const filteredData = hotels.filter((item) =>
    [
      item.hostelName,
      item.contactPerson,
      item.mobileNumber,
      item.city,
      item.area,
    ].some(
      (field) =>
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
        hotel.id === id ? { ...hotel, verified: !hotel.verified } : hostel
      )
    );
  };

  const deleteHostel = (id) => {
    setHostels(hotels.filter((hotel) => hotel.id !== id));
  };

  const navigateToAdd = () => {
    navigate("/hostel/add");
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await GetHotel();
        setHotels(res?.data || []);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleEditClick = async (id) => {
    try {
      const response = await GetIdHotel(id);
      console.log("Hotel data:", response?.data);
      navigate(`/hotel/edit/:id`);
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    }
  };

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
          Add Hostel
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
                  Hostel Name
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
              {currentData.length > 0 ? (
                currentData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {item.hotelName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.contactPerson}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.mobileNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.area}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleVerified(item.id)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full transition duration-300 ${
                          item.verified
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                      >
                        {item.verified ? "Verified" : "Unverified"}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => openModal(item._id)}
                        >
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
                        <button
                          className="text-yellow-600 hover:text-yellow-900"
                          onClick={() => handleEditClick(item._id)}
                        >
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
                          onClick={() => deleteHostel(item.id)}
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
                ))
              ) : (
                <tr>
                  <td
                    className="px-4 py-6 text-center text-gray-500"
                    colSpan={8}
                  >
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {filteredData.length > 0 && totalPages > 1 && (
        <div className="flex justify-end mt-2 items-center space-x-2 p-4">
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

      {isOpen && selectedHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
          >
            <div className="relative h-72 bg-gray-100">
              {selectedHotel.hotelImages &&
              selectedHotel.hotelImages.length > 0 ? (
                <>
                  <img
                    src={selectedHotel.hotelImages[currentImageIndex]}
                    alt="Hostel"
                    className="w-full h-full object-cover"
                  />
                  {selectedHotel.hotelImages.length > 1 && (
                    <>
                      <button
                        onClick={previousImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                      >
                        <FaChevronRight />
                      </button>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {selectedHotel.hotelImages.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex
                                ? "bg-white"
                                : "bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No images available
                </div>
              )}
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedHotel.hotelName}
                  </h2>
                  <div className="flex gap-2 mt-2 text-sm">
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full">
                      {selectedHotel.numberOfRooms} Rooms
                    </span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full">
                      Occupancy: {selectedHotel.numberOfOccupancies}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        selectedHotel.active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedHotel.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-black"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-4">
                  <div className="border-t pt-4">
                    <h3 className="text-gray-500 mb-2">Contact Info</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-gray-400" />
                        <span>{selectedHotel.contactPerson || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaPhone className="text-gray-400" />
                        <a href={`tel:${selectedHotel.mobileNumber}`}>
                          {selectedHotel.mobileNumber || "N/A"}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-gray-400" />
                        <a href={`mailto:${selectedHotel.mailId}`}>
                          {selectedHotel.mailId || "N/A"}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-gray-500 mb-2">Property Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FaHome className="text-gray-400" />
                        <span>
                          Rooms: {selectedHotel.numberOfRooms || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaUser className="text-gray-400" />
                        <span>
                          Occupancy:{" "}
                          {selectedHotel.numberOfOccupancies || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-t pt-4">
                    <h3 className="text-gray-500 mb-2">Location</h3>
                    <div className="flex gap-2 items-start">
                      <FaMapMarkerAlt className="text-gray-400 mt-1" />
                      <div>
                        <p>{selectedHotel.address || "N/A"}</p>
                        <p>
                          {selectedHotel.area}, {selectedHotel.city}
                        </p>
                        {selectedHotel.pincode && (
                          <p>PIN: {selectedHotel.pincode}</p>
                        )}
                        {selectedHotel.googleMapLink && (
                          <a
                            href={selectedHotel.googleMapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline inline-flex items-center gap-1 mt-1"
                          >
                            <FaMapMarkerAlt size={12} />
                            View on Map
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {selectedHotel.amenities &&
                    selectedHotel.amenities.length > 0 && (
                      <div className="border-t pt-4">
                        <h3 className="text-gray-500 mb-2">Amenities</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedHotel.amenities.map((item, idx) => {
                            // Clean up amenity string if it's in JSON format
                            let amenity = item;
                            if (item.startsWith('["') && item.endsWith('"]')) {
                              amenity = item.slice(2, -2);
                            }
                            return (
                              <span
                                key={idx}
                                className="bg-gray-100 px-2 py-0.5 rounded-full text-xs"
                              >
                                {amenity}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotel;
