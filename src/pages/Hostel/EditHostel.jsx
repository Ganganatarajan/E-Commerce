import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getHostelById, updateHostel } from "../../Services/Hostel";
import { message } from "antd";

const amenitiesList = [
  "Wi-Fi", "AC", "Laundry", "Food", "Parking", "Security",
  "Gym", "Study Room", "TV", "Hot Water", "Cleaning"
];

const EditHostelForm = () => {
  const { id } = useParams();
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
    googleMapLink: "",
    hostelImages: [],
    amenities: [],
  });

  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const res = await getHostelById(id);
        const data = res.data;
        console.log();
        
        setFormData({
          ...data,
          hostelImages: [],
        });
        setPreviewUrls(data.hostelImageUrls || []);
      } catch (err) {
        console.error("Failed to load hostel data", err);
        message.error("Unable to load hostel data");
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    const files = Array.from(e.target.files).slice(0, 5);
    setFormData((prev) => ({
      ...prev,
      hostelImages: files,
    }));
    const localPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(localPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (let key in formData) {
      if (key === "hostelImages") {
        formData.hostelImages.forEach((img) =>
          data.append("hostelImages", img)
        );
      } else if (key === "amenities") {
        formData.amenities.forEach((item) => data.append("amenities", item));
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      await updateHostel(id, data);
      message.success("Hostel updated successfully!");
      navigate("/hostel");
    } catch (err) {
      console.error("Update failed", err);
      message.error("Failed to update hostel.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate("/hostel")}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            ←
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Edit Hostel</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-6">
          {/* Text Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="hostelName" value={formData.hostelName} onChange={handleChange} placeholder="Hostel Name" className="input" />
            <input name="noOfRooms" value={formData.noOfRooms} onChange={handleChange} placeholder="Number of Rooms" className="input" />
            <input name="noOfOccupancies" value={formData.noOfOccupancies} onChange={handleChange} placeholder="Occupancy / Room" className="input" />
            <input name="contactPerson" value={formData.contactPerson} onChange={handleChange} placeholder="Contact Person" className="input" />
            <input name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="Mobile Number" className="input" />
            <input name="mailId" value={formData.mailId} onChange={handleChange} placeholder="Mail ID" className="input" />
            <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="input" />
            <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="input" />
            <input name="area" value={formData.area} onChange={handleChange} placeholder="Area" className="input" />
            <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" className="input" />
            <input name="googleMapLink" value={formData.googleMapLink} onChange={handleChange} placeholder="Google Map Link" className="input col-span-2" />
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-lg font-medium mb-2">Amenities</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {amenitiesList.map((item, i) => (
                <label key={i} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={item}
                    checked={formData.amenities.includes(item)}
                    onChange={handleAmenityChange}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-lg font-medium mb-2">Upload Images (Max 5)</label>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} />
            {previewUrls.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
                {previewUrls.map((preview, i) => (
                  <img key={i} src={preview} alt="preview" className="h-32 w-32 object-cover rounded-lg" />
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Update Hostel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHostelForm;
