import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GetHostel,
  deleteHostel as deleteHostelAPI,
} from "../../Services/Hostel";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEnvelope,
  FaHome,
  FaMapMarkerAlt,
  FaPhone,
  FaTimes,
  FaUser,
} from "react-icons/fa";

const Hostel = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [hostels, setHostels] = useState([]);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedHostel, setSelectedHostel] = useState(null);

  const modalRef = useRef(null);

  const openModal = (hostelId) => {
    const hostel = hostels.find((h) => h._id === hostelId?.toString());
    setSelectedHostel(hostel);
    setIsOpen(true);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedHostel(null);
  };

  const nextImage = () => {
    setCurrentImageIndex(
      (prev) => (prev + 1) % selectedHostel.hostelImages.length
    );
  };

  const previousImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + selectedHostel.images.length) %
        selectedHostel.hostelImages.length
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

  const getHostel = async () => {
    try {
      const res = await GetHostel();
      setHostels(res.data);
    } catch (error) {
      console.error("Failed to fetch hostels:", error);
    }
  };

  useEffect(() => {
    getHostel();
  }, []);

  const filteredData = hostels.filter((item) =>
    [
      item.hostelName,
      item.contactPerson,
      item.mobileNumber,
      item.city,
      item.area,
    ].some((field) => field?.toLowerCase().includes(search.toLowerCase()))
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
    setHostels(
      hostels.map((hostel) =>
        hostel._id === id ? { ...hostel, verified: !hostel.verified } : hostel
      )
    );
  };

  const deleteHostel = async (id) => {
    try {
      await deleteHostelAPI(id);
      setHostels(hostels.filter((hostel) => hostel._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const navigateToAdd = () => {
    navigate("/hostel/add");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search & Add */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="text"
            placeholder="Search by name, phone, city, or area"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg px-4 py-1 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <select
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
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md flex items-center transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
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

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "S.No",
                  "Hostel Name",
                  "Contact Person",
                  "Mobile",
                  "City",
                  "Area",
                  "Verified",
                  "Actions",
                ].map((title, i) => (
                  <th
                    key={i}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.length > 0 ? (
                currentData.map((item, index) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.hostelName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.contactPerson}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.mobileNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.city}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.area}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleVerified(item._id)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full transition duration-300 ${
                          item.verified
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                      >
                        {item.verified ? "Verified" : "Unverified"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {/* View */}
                        <button
                          onClick={() => openModal(item._id)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        {/* Edit */}
                        <button
                          onClick={() => navigate(`/hostel/get/${item._id}`)}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Edit"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828L7 15.828H4v-3.172l9.586-9.586z" />
                          </svg>
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => deleteHostel(item._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2h1v10a2 2 0 002 2h6a2 2 0 002-2V6h1a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM8 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
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
                  <td colSpan={8} className="text-center py-8 text-gray-500">
                    No hostels found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      {isOpen && selectedHostel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
          >
            <div className="relative h-72 bg-gray-100">
              {selectedHostel.hostelImages &&
              selectedHostel.hostelImages.length > 0 ? (
                <>
                  <img
                    src={selectedHostel.hostelImages[currentImageIndex]}
                    alt="Hostel"
                    className="w-full h-full object-cover"
                  />
                  {selectedHostel.hostelImages.length > 1 && (
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
                        {selectedHostel.hostelImages.map((_, index) => (
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
                    {selectedHostel.hotelName}
                  </h2>
                  <div className="flex gap-2 mt-2 text-sm">
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full">
                      {selectedHostel.numberOfRooms} Rooms
                    </span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full">
                      Occupancy: {selectedHostel.numberOfOccupancies}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        selectedHostel.active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedHostel.active ? "Active" : "Inactive"}
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
                        <span>{selectedHostel.contactPerson || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaPhone className="text-gray-400" />
                        <a href={`tel:${selectedHostel.mobileNumber}`}>
                          {selectedHostel.mobileNumber || "N/A"}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-gray-400" />
                        <a href={`mailto:${selectedHostel.mailId}`}>
                          {selectedHostel.mailId || "N/A"}
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
                          Rooms: {selectedHostel.numberOfRooms || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaUser className="text-gray-400" />
                        <span>
                          Occupancy:{" "}
                          {selectedHostel.numberOfOccupancies || "N/A"}
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
                        <p>{selectedHostel.address || "N/A"}</p>
                        <p>
                          {selectedHostel.area}, {selectedHostel.city}
                        </p>
                        {selectedHostel.pincode && (
                          <p>PIN: {selectedHostel.pincode}</p>
                        )}
                        {selectedHostel.googleMapLink && (
                          <a
                            href={selectedHostel.googleMapLink}
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

                  {selectedHostel.amenities &&
                    selectedHostel.amenities.length > 0 && (
                      <div className="border-t pt-4">
                        <h3 className="text-gray-500 mb-2">Amenities</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedHostel.amenities.map((item, idx) => {
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

export default Hostel;
