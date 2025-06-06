import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetIdHotel, UpdateHotel } from "../../Services/Hotel";
import { message } from "antd";

const amenitiesList = [
  "Wi-Fi",
  "AC",
  "Laundry",
  "Food",
  "Parking",
  "Security",
  "Gym",
  "Study Room",
  "TV",
  "Hot Water",
  "Cleaning",
];

const EditHotel = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    hotelName: "",
    numberOfRooms: "",
    numberOfOccupancies: "",
    contactPerson: "",
    mobileNumber: "",
    mailId: "",
    address: "",
    city: "",
    area: "",
    pincode: "",
    googleMapLink: "",
    hotelImages: [],
    amenities: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchHotelData = async () => {
        try {
          setLoading(true);
          const response = await GetIdHotel(id);
          const hotelData = response.data;

          // Clean up amenities data
          const cleanedAmenities = hotelData.amenities
            .map((amenity) => {
              try {
                // Handle stringified JSON arrays
                const parsed = JSON.parse(amenity.replace(/\\/g, ""));
                return Array.isArray(parsed) ? parsed[0] : parsed;
              } catch {
                // Handle simple string values
                return amenity.replace(/[\[\]"]/g, "");
              }
            })
            .filter((amenity) => amenitiesList.includes(amenity));

          setFormData({
            hotelName: hotelData.hotelName || "",
            numberOfRooms: hotelData.numberOfRooms || "",
            numberOfOccupancies: hotelData.numberOfOccupancies || "",
            contactPerson: hotelData.contactPerson || "",
            mobileNumber: hotelData.mobileNumber || "",
            mailId: hotelData.mailId || "",
            address: hotelData.address || "",
            city: hotelData.city || "",
            area: hotelData.area || "",
            pincode: hotelData.pincode || "",
            googleMapLink: hotelData.googleMapLink || "",
            amenities: cleanedAmenities,
            hotelImages: [],
          });

          setExistingImages(hotelData.hotelImages || []);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching hotel:", error);
          message.error("Failed to load hotel data");
          setLoading(false);
        }
      };

      fetchHotelData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, value]
        : prev.amenities.filter((item) => item !== value),
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const availableSlots =
      5 - (existingImages.length + formData.hotelImages.length);
    const selectedFiles = files.slice(0, availableSlots);

    // Create previews for new files only
    const newPreviews = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      hotelImages: [...prev.hotelImages, ...selectedFiles],
    }));

    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveExistingImage = (index) => {
    const updatedImages = [...existingImages];
    updatedImages.splice(index, 1);
    setExistingImages(updatedImages);
  };

  const handleRemoveNewImage = (index) => {
    const updatedFiles = [...formData.hotelImages];
    updatedFiles.splice(index, 1);
    setFormData((prev) => ({ ...prev, hotelImages: updatedFiles }));

    const updatedPreviews = [...imagePreviews];
    URL.revokeObjectURL(updatedPreviews[index].preview); // Clean up memory
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      // Append all form fields except images and amenities
      Object.entries(formData).forEach(([key, value]) => {
        if (
          key !== "hotelImages" &&
          key !== "amenities" &&
          value !== null &&
          value !== undefined
        ) {
          data.append(key, value);
        }
      });

      // Append amenities
      formData.amenities.forEach((amenity) => {
        data.append("amenities", amenity);
      });

      // Append existing image URLs (strings)
      existingImages.forEach((image) => {
        if (typeof image === "string") {
          data.append("hotelImages", image);
        }
      });

      // Append new image files
      formData.hotelImages.forEach((file) => {
        data.append("hotelImages", file);
      });

      // Send update request
      const response = await UpdateHotel(id, data);
      console.log("UpdateHotel response:", response);

      // Check success flag (adjust based on actual response structure)
      const isSuccess = response?.success || response?.data?.success;

      if (!isSuccess) message.success("Hotel updated successfully!");
      navigate("/hotel");
    } catch (error) {
      console.error("Error updating hotel:", error);
      message.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update hotel"
      );
    } finally {
      // Clean up object URLs
      imagePreviews.forEach(({ preview }) => URL.revokeObjectURL(preview));
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (id) {
      // If editing, reset to original values
      setFormData({
        ...formData,
        hotelImages: [],
        amenities: formData.amenities,
      });
      setImagePreviews([]);
    } else {
      // If creating, clear everything
      setFormData({
        hotelName: "",
        numberOfRooms: "",
        numberOfOccupancies: "",
        contactPerson: "",
        mobileNumber: "",
        mailId: "",
        address: "",
        city: "",
        area: "",
        pincode: "",
        googleMapLink: "",
        hotelImages: [],
        amenities: [],
      });
      setImagePreviews([]);
      setExistingImages([]);
    }
  };

  if (loading && id) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-2">
      <div className=" mx-auto">
        <div className="flex items-center mb-8 mt-2">
          <button
            onClick={() => navigate("/hotel")}
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
            {id ? "Edit Hotel" : "Create New Hotel"}
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hotel Name
              </label>
              <input
                type="text"
                name="hotelName"
                value={formData.hotelName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                No. of Rooms
              </label>
              <input
                type="number"
                name="numberOfRooms"
                value={formData.numberOfRooms}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                No. of Occupancies
              </label>
              <input
                type="number"
                name="numberOfOccupancies"
                value={formData.numberOfOccupancies}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Person
              </label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mail ID
              </label>
              <input
                type="email"
                name="mailId"
                value={formData.mailId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Area
              </label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location - Google Map Link
            </label>
            <input
              type="url"
              name="googleMapLink"
              value={formData.googleMapLink}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hotel Images (Max 5)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                  >
                    <span>Upload files</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      disabled={
                        existingImages.length + formData.hotelImages.length >= 5
                      }
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 5MB (Total images:{" "}
                  {existingImages.length + formData.hotelImages.length}/5)
                </p>
              </div>
            </div>

            {/* Display existing images */}
            {/* Display existing images */}
            {existingImages.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Current Images
                </h3>
                <div className="flex flex-wrap gap-4">
                  {existingImages.map((image, index) => (
                    <div key={`existing-${index}`} className="relative group">
                      <img
                        src={
                          typeof image === "string"
                            ? image
                            : URL.createObjectURL(image)
                        }
                        alt={`Existing ${index}`}
                        className="h-32 w-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveExistingImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Display new image previews */}
            {imagePreviews.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  New Images
                </h3>
                <div className="flex flex-wrap gap-4">
                  {imagePreviews.map(({ preview }, index) => (
                    <div key={`new-${index}`} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index}`}
                        className="h-32 w-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveNewImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {amenitiesList.map((amenity) => (
                <div key={amenity} className="flex items-center">
                  <input
                    id={`amenity-${amenity}`}
                    type="checkbox"
                    value={amenity}
                    checked={formData.amenities.includes(amenity)}
                    onChange={handleAmenityChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`amenity-${amenity}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {id ? "Updating..." : "Creating..."}
                </>
              ) : id ? (
                "Update Hotel"
              ) : (
                "Create Hotel"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHotel;
