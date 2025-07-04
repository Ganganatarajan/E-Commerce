import React, { useState, useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getAllDirectors, 
  deleteDirectors, 
  updateDirectors 
} from '../../Services/SkilledDirectors';
import { message } from 'antd';
import { FaEnvelope, FaImage, FaPhone, FaTimes, FaUser } from 'react-icons/fa';
import { FaUpwork } from 'react-icons/fa6';

const SkilledDirectors = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedskill, setSelectedskill] = useState(null);
  
    const modalRef = useRef(null);
  
    const openModal = (skillId) => {
      const skill = directors.find((j) => j._id === skillId?.toString());
      setSelectedskill(skill);
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
      setSelectedskill(null);
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

  useEffect(() => {
    fetchDirectors();
  }, []);

  const fetchDirectors = async () => {
    try {
      setLoading(true);
      const response = await getAllDirectors();
      setDirectors(response.data || []);
      setLoading(false);
    } catch (err) {
      message.error('Failed to fetch directors');
      setLoading(false);
    }
  };

  const filteredData = directors.filter((item) =>
    [item.name, item.mailId, item.phoneNo].some((field) =>
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

  const toggleVerified = async (id) => {
    try {
      const director = directors.find(d => d._id === id);
      const updatedDirector = { 
        ...director, 
        isApproved: !director.isApproved 
      };
      
      await updateDirectors(id, updatedDirector);
      setDirectors(directors.map(d => 
        d._id === id ? updatedDirector : d
      ));
      message.success('Status updated successfully');
    } catch (err) {
      message.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDirectors(id);
      setDirectors(directors.filter(director => director._id !== id));
      message.success('Director deleted successfully');
      
      // Reset to first page if the deletion affects the current page
      if (currentData.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      message.error('Failed to delete director');
    }
  };

  // const handleEdit = (id) => {
  //   navigate(`skilldirectory/${id}`);
  // };

  const handleView = (id) => {
    navigate(`/skill-directory/view/${id}`);
  };

  const handleAddNew = () => {
    navigate('/skilldirectory/add');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="text"
            placeholder="Search by name, email, phone number"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
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
          onClick={handleAddNew}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentData.map((director, index) => (
                    <tr key={director._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{startIndex + index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{director.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{director.phoneNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{director.mailId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {director.workType?.join(', ') || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleVerified(director._id)}
                          className={`px-3 py-1 text-xs font-semibold rounded-full transition duration-300 ${
                            director.isApproved
                              ? 'bg-green-500 text-white hover:bg-green-600'
                              : 'bg-red-500 text-white hover:bg-red-600'
                          }`}
                        >
                          {director.isApproved ? 'Approved' : 'Pending'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
onClick={() => openModal(director._id)}                            
className="text-blue-600 hover:text-blue-900"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <button 
                            // onClick={() => handleEdit(director._id)}
                               onClick={() =>
                            navigate(`/skilldirectory/${director._id}`, { state: director })
                          }
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(director._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredData.length === 0 && !loading && (
              <div className="p-8 text-center text-gray-500">No directors found</div>
            )}
          </>
        )}
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

      {isOpen && selectedskill && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 transition-opacity duration-300"
                role="dialog"
                aria-labelledby="job-modal-title"
                aria-modal="true"
              >
                <div
                  ref={modalRef}
                  className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100 hover:scale-[1.01]"
                >
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
                      <h2
                        id="job-modal-title"
                        className="text-2xl font-bold text-gray-900"
                      >
                        {selectedskill.name}
                      </h2>
                      <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                        aria-label="Close modal"
                      >
                        <FaTimes size={20} />
                      </button>
                    </div>
      
          
                    <div className="grid grid-cols-1 gap-8 p-5">
                                      {/* Job Details */}
                                      <div className="space-y-6">
  <div>
    <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-3">
      skillDirectory Details
    </h3>
    <div className="space-y-4">
      {/* Profile Image Field */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          {selectedskill.profileImage ? (
            <img 
              src={selectedskill.profileImage} 
              alt="Profile" 
              className="w-12 h-12 rounded-full object-contain border border-gray-200"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <FaUser className="text-gray-400" />
            </div>
          )}
        </div>
      </div>
      
      {/* Existing fields */}
      <div className="flex items-center gap-3">
        <FaUser className="text-indigo-600 w-5 h-5" />
        <p className="text-gray-600">
          <span className="font-medium">Phone no:</span>{" "}
          {selectedskill.phoneNo || "N/A"}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <FaEnvelope className="text-indigo-600 w-5 h-5" />
        <p className="text-gray-600">
          <span className="font-medium">Email:</span>{" "}
          {selectedskill.mailId || "N/A"}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <FaUpwork className="text-indigo-600 w-5 h-5" />
        <p className="text-gray-600">
          <span className="font-medium">WorkType:</span>{" "}
          {selectedskill.workType?.join(', ') || "N/A"}
        </p>
      </div>
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

export default SkilledDirectors;