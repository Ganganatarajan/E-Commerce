import React from 'react';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const ViewAdmin = ({ admin, onClose }) => {
  if (!admin) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md relative">
        
        {/* Close button top-right like your example */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Title centered */}
        <h2 className="text-2xl font-semibold text-indigo-600 text-center mb-6">
          Admin Details
        </h2>

        <hr className="my-2 border-t border-gray-300" />

        {/* Admin Info */}
        <div className="space-y-4 text-gray-700">
          <div className="flex items-center gap-3">
            <FaUser className="text-indigo-500" />
            <p><strong>Name:</strong> {admin.Name}</p>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-indigo-500" />
            <p><strong>Email:</strong> {admin.EmailID}</p>
          </div>
          <div className="flex items-center gap-3">
            <FaPhone className="text-indigo-500" />
            <p><strong>Mobile:</strong> {admin.MobileNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAdmin;
