import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHostel } from "../../Services/Hostel";
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

const roomTypes = ["Classic", "Deluxe", "Premium", "Standard"];

const HostelForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hostelName: "",
    noOfRooms: "",
    noOfOccupancies: "",
    contactPerson: "",
    mobileNumber: "",
    mailId: "",
    address: "",
    city: "",
    area: "",
    pincode: "",
    locationLink: "",
    hostelImages: [],
    amenities: [],
    slotAvailability: roomTypes.map(type => ({
      type,
      ac: { available: false, count: 0 },
      nonAc: { available: false, count: 0 }
    }))
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, value],
      });
    } else {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter((item) => item !== value),
      });
    }
  };

  const handleRoomAvailabilityChange = (index, field, subField, value) => {
    const updatedAvailability = [...formData.slotAvailability];
    
    if (subField) {
      updatedAvailability[index][field][subField] = 
        field === 'type' ? value : 
        subField === 'count' ? parseInt(value) || 0 : 
        value;
    } else {
      updatedAvailability[index][field] = value;
    }
    
    setFormData({
      ...formData,
      slotAvailability: updatedAvailability
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setFormData({
      ...formData,
      hostelImages: files,
    });

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Prepare form data for submission
    const submissionData = {
      ...formData,
      hostelImages: formData.hostelImages.map(file => file.name),
      slotAvailability: formData.slotAvailability
        .filter(room => room.type) // filter out empty types
        .map(room => ({
          type: room.type,
          ac: {
            available: room.ac.available,
            count: room.ac.available ? room.ac.count : 0
          },
          nonAc: {
            available: room.nonAc.available,
            count: room.nonAc.available ? room.nonAc.count : 0
          }
        }))
    };

    // Log the payload before sending
    console.log("Payload being sent:", JSON.stringify(submissionData, null, 2));

    const res = await createHostel(submissionData);
    console.log("Form submitted:", res);
    message.success("Hostel created successfully!");
    navigate("/hostel");
  } catch (err) {
    console.error("Create Hostel Error:", err);
    message.error("Failed to create hostel.");
  }
};

  const handleReset = () => {
    setFormData({
      hostelName: "",
      noOfRooms: "",
      noOfOccupancies: "",
      contactPerson: "",
      mobileNumber: "",
      mailId: "",
      address: "",
      city: "",
      area: "",
      pincode: "",
      locationLink: "",
      hostelImages: [],
      amenities: [],
      slotAvailability: roomTypes.map(type => ({
        type,
        ac: { available: false, count: 0 },
        nonAc: { available: false, count: 0 }
      }))
    });
    setImagePreviews([]);
  };

  return (
    <div className="container mx-auto p-2">
      <div className="mx-auto">
        <div className="flex items-center mb-8 mt-2">
          <button
            onClick={() => navigate("/hostel")}
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
          <h1 className="text-2xl font-bold text-gray-800">Add New Hostel</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hostel Name
              </label>
              <input
                type="text"
                name="hostelName"
                value={formData.hostelName}
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
                name="noOfRooms"
                value={formData.noOfRooms}
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
                name="noOfOccupancies"
                value={formData.noOfOccupancies}
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
              name="locationLink"
              value={formData.locationLink}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hostel Images (Up to 5)
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
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
            {imagePreviews.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index}`}
                      className="h-32 w-32 object-cover rounded-lg"
                    />
                  </div>
                ))}
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

          {/* Room Availability Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Room Availability</h2>
            <div className="space-y-6">
              {formData.slotAvailability.map((room, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room Type
                    </label>
                    <input
                      type="text"
                      value={room.type}
                      onChange={(e) => handleRoomAvailabilityChange(index, 'type', null, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* AC Availability */}
                    <div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center mb-3">
                        <input
                          type="checkbox"
                          checked={room.ac.available}
                          onChange={(e) => handleRoomAvailabilityChange(index, 'ac', 'available', e.target.checked)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm font-medium text-gray-700">
                          AC Available
                        </label>
                      </div>
                      
                      {room.ac.available && (
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">
                            Number of AC Rooms
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={room.ac.count}
                            onChange={(e) => handleRoomAvailabilityChange(index, 'ac', 'count', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            required={room.ac.available}
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Non-AC Availability */}
                    <div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center mb-3">
                        <input
                          type="checkbox"
                          checked={room.nonAc.available}
                          onChange={(e) => handleRoomAvailabilityChange(index, 'nonAc', 'available', e.target.checked)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm font-medium text-gray-700">
                          Non-AC Available
                        </label>
                      </div>
                      
                      {room.nonAc.available && (
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">
                            Number of Non-AC Rooms
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={room.nonAc.count}
                            onChange={(e) => handleRoomAvailabilityChange(index, 'nonAc', 'count', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            required={room.nonAc.available}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    ...formData,
                    slotAvailability: [
                      ...formData.slotAvailability,
                      {
                        type: "",
                        ac: { available: false, count: 0 },
                        nonAc: { available: false, count: 0 }
                      }
                    ]
                  });
                }}
                className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Another Room Type
              </button>
            </div>
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HostelForm;