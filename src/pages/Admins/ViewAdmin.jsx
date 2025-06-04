import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewAdmin = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const admin = state?.admin;

  if (!admin) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>Admin details not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md text-center">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">Admin Details</h2>
      <div className="space-y-4 text-gray-700">
        {/* <p><strong>ID:</strong> {admin.id}</p> */}
        <p><strong>Name:</strong> {admin.Name}</p>
        <p><strong>Email ID:</strong> {admin.EmailID}</p>
        <p><strong>Mobile Number:</strong> {admin.MobileNumber}</p>
      </div>
      <div className="flex justify-center">
  <button
    onClick={() => navigate(-1)}
    className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded"
  >
    Back
  </button>
</div>

    </div>
  );
};

export default ViewAdmin;
