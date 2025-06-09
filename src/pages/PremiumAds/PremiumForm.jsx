import React, { useState } from "react";

const PremiumForm = () => {
  const [formData, setFormData] = useState({
    hostelType: "single",
    branches: "",
    title: "",
    content: "",
    image: null,
    branchName: "",
    locationSide: "north",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    if (file) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image) {
      setError("Image is required");
      return;
    }

    console.log("Submitting:", formData);
    // Handle API submission here
  };

  const handleCancel = () => {
    setFormData({
      hostelType: "single",
      branches: "",
      title: "",
      content: "",
      image: null,
      branchName: "",
      locationSide: "north",
    });
    setError("");
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Premium Hostel Advertisement</h1>
        <p className="text-sm text-gray-600 mb-6">
          Create a new premium advertisement for your hostel(s)
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hostel Type */}
          <div className="space-y-2">
            <label className="block font-medium text-gray-700">Hostel Type</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="hostelType"
                  value="single"
                  checked={formData.hostelType === "single"}
                  onChange={handleChange}
                  className="text-purple-600"
                />
                <span className="ml-2">Single Hostel</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="hostelType"
                  value="multi"
                  checked={formData.hostelType === "multi"}
                  onChange={handleChange}
                  className="text-purple-600"
                />
                <span className="ml-2">Multiple Hostels</span>
              </label>
            </div>
          </div>

          {/* Branches (conditional) */}
          {formData.hostelType === "multi" && (
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Number of Branches
              </label>
              <input
                type="number"
                name="branches"
                value={formData.branches}
                onChange={handleChange}
                min="1"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-purple-600 focus:ring-1 focus:ring-purple-600"
              />
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-purple-600 focus:ring-1 focus:ring-purple-600"
              placeholder="Enter a catchy title for your advertisement"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-purple-600 focus:ring-1 focus:ring-purple-600"
              placeholder="Describe your hostel's features, amenities, and special offers"
            />
          </div>

          {/* Branch Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Branch Name
            </label>
            <input
              type="text"
              name="branchName"
              value={formData.branchName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-purple-600 focus:ring-1 focus:ring-purple-600"
              placeholder="Enter the branch name (if applicable)"
            />
          </div>

          {/* Location Side */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Location Side
            </label>
            <select
              name="locationSide"
              value={formData.locationSide}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-purple-600 focus:ring-1 focus:ring-purple-600"
            >
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="east">East</option>
              <option value="west">West</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Hostel Image
            </label>
            <div
              className={`border-2 ${
                error ? "border-red-500" : "border-dashed border-gray-300"
              } rounded-md p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="imageUpload"
              />
              <label
                htmlFor="imageUpload"
                className="cursor-pointer text-center"
              >
                <div className="text-3xl text-purple-600 mb-2">📷</div>
                <p className="text-sm text-gray-700 font-medium">
                  {formData.image ? formData.image.name : "Click to upload hostel image"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended size: 1200x600px
                </p>
              </label>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors shadow-sm"
            >
              Publish Advertisement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PremiumForm;