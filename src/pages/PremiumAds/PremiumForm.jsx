import React, { useState } from "react";

const PremiumForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    area: "",
    banner: null,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, banner: file }));
    if (file) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.banner) {
      setError("Banner image is required");
      return;
    }

    console.log("Submitting:", formData);
    // Handle API submission here
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      phone: "",
      city: "",
      area: "",
      banner: null,
    });
    setError("");
  };

  return (
    <div className="p-2 bg-gray-50">
      <div className=" mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-1">Add Premium Ad</h1>
        <p className="text-sm text-gray-500 mb-6">
          Create a new premium advertisement for a hostel.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Hostel Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-purple-800"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-purple-800"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-purple-800"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Area
              </label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-purple-800"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Banner Upload
            </label>
            <div
              className={`border-2 ${
                error ? "border-red-500" : "border-dashed border-gray-300"
              } rounded-md p-6 flex flex-col items-center justify-center`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerUpload}
                className="hidden"
                id="bannerUpload"
              />
              <label
                htmlFor="bannerUpload"
                className="cursor-pointer text-center"
              >
                <div className="text-2xl text-gray-500">📤</div>
                <p className="text-sm text-gray-700 mt-2">
                  Drag & drop or click to upload
                </p>
                <p className="text-xs text-gray-400">Upload a single file</p>
              </label>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-900"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PremiumForm;
