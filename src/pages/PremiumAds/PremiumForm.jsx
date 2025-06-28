import React, { useState } from "react";
import { CreatePremimumAds } from "../../Services/PremimumAds";

const PremiumForm = () => {
  const [formData, setFormData] = useState({
    hostelType: "Single Hostel",
    branches: "",
    title: "",
    content: "",
    images: [],
    branchName: "",
    locationSide: "North",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Validate number of images
    if (formData.images.length + files.length > 5) {
      setError("You can upload a maximum of 5 images");
      return;
    }
    
    // Validate file types
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    if (validFiles.length !== files.length) {
      setError("Only image files are allowed");
      return;
    }
    
    // Create preview URLs
    const newImages = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
    
    if (validFiles.length > 0) setError("");
  };

  const removeImage = (index) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(formData.images[index].preview);
    
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.images.length === 0) {
      setError("At least one image is required");
      return;
    }

    const submitData = new FormData();
    submitData.append("hostelType", formData.hostelType);
    submitData.append("title", formData.title);
    submitData.append("content", formData.content);
    submitData.append("branchName", formData.branchName);
    submitData.append("locationSide", formData.locationSide);
    
    // Append all images
    formData.images.forEach(image => {
      submitData.append("bannerImage", image.file);
    });
    
    try {
      setIsSubmitting(true);
      const response = await CreatePremimumAds(submitData);
      console.log("Advertisement created successfully:", response.data);
      
      // Clean up object URLs
      formData.images.forEach(image => URL.revokeObjectURL(image.preview));
      
      handleCancel();
      alert("Premium advertisement created successfully!");
    } catch (err) {
      console.error("Error creating advertisement:", err);
      setError(err.response?.data?.message || "Failed to create advertisement");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Clean up object URLs before resetting
    formData.images.forEach(image => URL.revokeObjectURL(image.preview));
    
    setFormData({
      hostelType: "Single Hostel",
      branches: "",
      title: "",
      content: "",
      images: [],
      branchName: "",
      locationSide: "North",
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

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hostel Type */}
          <div className="space-y-2">
            <label className="block font-medium text-gray-700">Hostel Type</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="hostelType"
                  value="Single Hostel"
                  checked={formData.hostelType === "Single Hostel"}
                  onChange={handleChange}
                  className="text-purple-600"
                />
                <span className="ml-2">Single Hostel</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="hostelType"
                  value="Multiple Hostel"
                  checked={formData.hostelType === "Multiple Hostel"}
                  onChange={handleChange}
                  className="text-purple-600"
                />
                <span className="ml-2">Multiple Hostels</span>
              </label>
            </div>
          </div>

          {/* Branches (conditional) */}
          {formData.hostelType === "Multiple Hostel" && (
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
              required
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
              required
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
              placeholder="Enter the branch name"
              required
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
              required
            >
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
            </select>
          </div>

          {/* Image Upload */}
       <div>
            <label className="block font-medium text-gray-700 mb-2">
              Hostel Images (Max 5)
            </label>
            
            {/* Image Previews */}
            {formData.images.length > 0 && (
              <div className="mb-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={image.preview} 
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                      {image.file.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
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
                multiple
                disabled={formData.images.length >= 5}
              />
              <label
                htmlFor="imageUpload"
                className={`cursor-pointer text-center ${
                  formData.images.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div className="text-3xl text-purple-600 mb-2">📷</div>
                <p className="text-sm text-gray-700 font-medium">
                  {formData.images.length > 0 
                    ? `Upload more images (${formData.images.length}/5)`
                    : "Click to upload hostel images"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended size: 1200x600px (Max 5 images)
                </p>
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {formData.images.length} of 5 images selected
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors shadow-sm disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Publishing..." : "Publish Advertisement"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PremiumForm;