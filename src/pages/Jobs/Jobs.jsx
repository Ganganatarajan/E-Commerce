

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllJobs, deleteJob } from "../../Services/Jobs";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaTimes,
  FaUser,
} from "react-icons/fa";

const Jobs = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const modalRef = useRef(null);

  const openModal = (jobId) => {
    const job = jobs.find((j) => j._id === jobId?.toString());
    setSelectedJob(job);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedJob(null);
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

  const fetchJobs = async () => {
    try {
      const res = await getAllJobs();
      setJobs(res.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredData = jobs.filter((item) =>
    [
      item.jobTitle,
      item.category,
      item.location,
      item.postedBy,
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

  const toggleApproved = (id) => {
    setJobs(
      jobs.map((job) =>
        job._id === id ? { ...job, isApproved: !job.isApproved } : job
      )
    );
  };

  const deleteJobById = async (id) => {
    try {
      await deleteJob(id);
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const navigateToAdd = () => {
    navigate("/jobs/add");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search & Add */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="text"
            placeholder="Search by title, category, location, or posted by"
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
          Add Job
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
                  "Job Title",
                  "Category",
                  "Location",
                  "Salary",
                  "Posted By",
                  "Approved",
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
                      {item.jobTitle}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.salary}
</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.postedBy}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleApproved(item._id)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full transition duration-300 ${
                          item.isApproved
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                      >
                        {item.isApproved ? "Approved" : "Not Approved"}
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
                          onClick={() => navigate(`/jobs/edit/${item._id}`)}
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
                          onClick={() => deleteJobById(item._id)}
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
                    No jobs found.
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
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity只

System: opacity-50"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 Rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
          >
            <div className="p-6 overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                  

System: {selectedJob.jobTitle}
                  </h2>
                  <div className="flex gap-2 items-start mb-6">
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full">
                      {selectedJob.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        selectedJob.isApproved
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedJob.isApproved ? "Approved" : "Not Approved"}
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
                    <h3 className="text-gray-500 mb-2">Job Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-gray-400" />
                        <span>Posted By: {selectedJob.postedBy || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-gray-400" />
                        <span>Salary: {selectedJob.salary || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaPhone className="text-gray-400" />
                        <span>
                          Experience: {selectedJob.experienceRequired || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border-t pt-4">
                      <h3 className="text-gray-500 mb-2">Location</h3>
                      <div className="flex gap-2 items-start">
                        <FaMapMarkerAlt className="text-gray-400 mt-1" />
                        <div>
                          <p>{selectedJob.location || "N/A"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="text-gray-500 mb-2">Description</h3>

System: <p>{selectedJob.description || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;