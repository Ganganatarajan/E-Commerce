import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { createJob, updateJob } from "../../Services/Jobs";
import { message } from "antd";

const JobForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    jobTitle: "",
    category: "",
    location: "",
    salary: "",
    experienceRequired: "",
    description: "",
    postedBy: "",
    isApproved: false,
  });

  useEffect(() => {
    if (isEditMode && location.state) {
      setFormData({
        jobTitle: location.state.jobTitle || "",
        category: location.state.category || "",
        location: location.state.location || "",
        salary: location.state.salary || "",
        experienceRequired: location.state.experienceRequired || "",
        description: location.state.description || "",
        postedBy: location.state.postedBy || "",
        isApproved: location.state.isApproved || false,
      });
    }
  }, [isEditMode, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "salary" ? parseFloat(value) || "" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        salary: parseFloat(formData.salary) || 0,
      };
      if (isEditMode) {
        await updateJob(id, dataToSubmit);
        // message.success("Job updated successfully!");
      } else {
        await createJob(dataToSubmit);
        // message.success("Job created successfully!");
      }
      navigate("/jobs");
    } catch (err) {
      console.error(isEditMode ? "Update Job Error:" : "Create Job Error:", err);
      message.error(isEditMode ? "Failed to update job." : "Failed to create job.");
    }
  };

  const handleReset = () => {
    setFormData({
      jobTitle: "",
      category: "",
      location: "",
      salary: "",
      experienceRequired: "",
      description: "",
      postedBy: "",
      isApproved: false,
    });
  };

  return (
    <div className="container mx-auto p-2">
      <div className="mx-auto">
        <div className="flex items-center mb-8 mt-2">
          <button
            onClick={() => navigate("/jobs")}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditMode ? "Edit Job" : "Add New Job"}
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience Required
              </label>
              <input
                type="text"
                name="experienceRequired"
                value={formData.experienceRequired}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Posted By
              </label>
              <input
                type="text"
                name="postedBy"
                value={formData.postedBy}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isEditMode ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;