import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getHostelById, updateHostel } from "../../Services/Hostel";
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

const EditHostelForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hostelName: "",
    noOfRooms: "",
    numberOfOccupancies: "",
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

  const [existingImageUrls, setExistingImageUrls] = useState([]);
  const [newPreviewUrls, setNewPreviewUrls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getHostelById(id);
        const data = res?.data || res;

        setFormData({
          hostelName: data?.hostelName || "",
          noOfRooms: data?.numberOfRooms?.toString() || "",
          numberOfOccupancies: data?.numberOfOccupancies?.toString() || "",
          contactPerson: data?.contactPerson || "",
          mobileNumber: data?.mobileNumber || "",
          mailId: data?.mailId || "",
          address: data?.address || "",
          city: data?.city || "",
          area: data?.area || "",
          pincode: data?.pincode || "",
          googleMapLink: data?.googleMapLink || "",
          hostelImages: [],
          amenities: data?.amenities || [],
        });

        setExistingImageUrls(data?.hostelImages || []);
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
    const selectedFiles = Array.from(e.target.files);
    // const total =
    //   existingImageUrls.length +
    //   formData.hostelImages.length +
    //   selectedFiles.length;

    // if (total > 5) {
    //   message.error("Only 5 images allowed in total (existing + new)");
    //   return;
    // }

    setFormData((prev) => ({
      ...prev,
      hostelImages: [...prev.hostelImages, ...selectedFiles],
    }));

    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setNewPreviewUrls((prev) => [...prev, ...previews]);
  };

  const handleDeleteExistingImage = (index) => {
    setExistingImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteNewImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      hostelImages: prev.hostelImages.filter((_, i) => i !== index),
    }));
    setNewPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    //  const totalImages = existingImageUrls.length + formData.hostelImages.length;

    // if (totalImages !== 5) {
    //   message.error("Please upload exactly 5 images (existing + new).");
    //   return;
    // }

    // Append form fields
    data.append("hostelName", formData.hostelName);
    data.append("numberOfRooms", formData.noOfRooms);
    data.append("numberOfOccupancies", formData.numberOfOccupancies);
    data.append("contactPerson", formData.contactPerson);
    data.append("mobileNumber", formData.mobileNumber);
    data.append("mailId", formData.mailId);
    data.append("address", formData.address);
    data.append("city", formData.city);
    data.append("area", formData.area);
    data.append("pincode", formData.pincode);
    data.append("googleMapLink", formData.googleMapLink);

    // Append amenities
    formData.amenities.forEach((item) => data.append("amenities", item));

    // ✅ Append existing image URLs (as individual values)
    existingImageUrls.forEach((url) => {
      data.append("hostelImages", url);
    });

    // ✅ Append new hostel images (as file objects)
    formData.hostelImages.forEach((file) => {
      data.append("hostelImages", file);
    });

    // try {
    //   await updateHostel(id, data);
    //   message.success("Hostel updated successfully!");
    //   navigate("/hostel");
    // } catch (err) {
    //   console.error("Update failed", err);
    //   message.error("Failed to update hostel.");
    // }

    try {
      await updateHostel(id, data);
      message.success("Hostel updated successfully!");

      // 🟢 Fetch the updated data
      const res = await getHostelById(id);
      const updatedData = res?.data || res;

      // 🟢 Set updated form data
      setFormData({
        hostelName: updatedData?.hostelName || "",
        noOfRooms: updatedData?.numberOfRooms?.toString() || "",
        numberOfOccupancies: updatedData?.numberOfOccupancies?.toString() || "",
        contactPerson: updatedData?.contactPerson || "",
        mobileNumber: updatedData?.mobileNumber || "",
        mailId: updatedData?.mailId || "",
        address: updatedData?.address || "",
        city: updatedData?.city || "",
        area: updatedData?.area || "",
        pincode: updatedData?.pincode || "",
        googleMapLink: updatedData?.googleMapLink || "",
        hostelImages: [], // clear file inputs
        amenities: updatedData?.amenities || [],
      });

      setExistingImageUrls(updatedData?.hostelImages || []);
      setNewPreviewUrls([]); // clear new image previews

      navigate("/hostel");
    } catch (err) {
      console.error("Update failed", err);
      message.error("Failed to update hostel.");
    }
  };

  return (
    <div className="container mx-auto p-2">
      <div className=" mx-auto">
        <div className="flex items-center mb-8">
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
          <h1 className="text-2xl font-bold text-gray-800">Edit Hostel</h1>
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
                Number of Rooms
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
                Occupancy / Room
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

          {/* Image Upload with Delete Preview */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Images (Max 5)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            <p className="text-sm text-gray-500 mt-1">
              {existingImageUrls.length + newPreviewUrls.length} / 5 images
            </p>

            {(existingImageUrls.length > 0 || newPreviewUrls.length > 0) && (
              <div className="mt-4 flex flex-wrap gap-4">
                {existingImageUrls.map((url, i) => (
                  <div key={`existing-${i}`} className="relative">
                    <img
                      src={url}
                      alt="existing"
                      className="h-32 w-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteExistingImage(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {newPreviewUrls.map((preview, i) => (
                  <div key={`new-${i}`} className="relative">
                    <img
                      src={preview}
                      alt="new"
                      className="h-32 w-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteNewImage(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {amenitiesList.map((item, i) => (
                <div key={i} className="flex items-center">
                  <input
                    type="checkbox"
                    value={item}
                    checked={formData.amenities?.includes(item)}
                    onChange={handleAmenityChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">{item}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Hostel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // return (
  //   <div className="container mx-auto px-4 py-8">
  //     <div className="max-w-4xl mx-auto">
  //       <div className="flex items-center mb-8">
  //         <button
  //           onClick={() => navigate("/hostel")}
  //           className="mr-4 text-gray-600 hover:text-gray-900"
  //         >
  //           ←
  //         </button>
  //         <h1 className="text-3xl font-bold text-gray-800">Edit Hostel</h1>
  //       </div>

  //       <form
  //         onSubmit={handleSubmit}
  //         className="bg-white rounded-xl shadow-md p-6 space-y-6"
  //       >
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //           <input
  //             name="hostelName"
  //             value={formData.hostelName}
  //             onChange={handleChange}
  //             placeholder="Hostel Name"
  //             className="input"
  //           />
  //           <input
  //             name="noOfRooms"
  //             value={formData.noOfRooms}
  //             onChange={handleChange}
  //             placeholder="Number of Rooms"
  //             className="input"
  //           />
  //           <input
  //             name="numberOfOccupancies"
  //             value={formData.numberOfOccupancies}
  //             onChange={handleChange}
  //             placeholder="Occupancy / Room"
  //             className="input"
  //           />
  //           <input
  //             name="contactPerson"
  //             value={formData.contactPerson}
  //             onChange={handleChange}
  //             placeholder="Contact Person"
  //             className="input"
  //           />
  //           <input
  //             name="mobileNumber"
  //             value={formData.mobileNumber}
  //             onChange={handleChange}
  //             placeholder="Mobile Number"
  //             className="input"
  //           />
  //           <input
  //             name="mailId"
  //             value={formData.mailId}
  //             onChange={handleChange}
  //             placeholder="Mail ID"
  //             className="input"
  //           />
  //           <input
  //             name="address"
  //             value={formData.address}
  //             onChange={handleChange}
  //             placeholder="Address"
  //             className="input"
  //           />
  //           <input
  //             name="city"
  //             value={formData.city}
  //             onChange={handleChange}
  //             placeholder="City"
  //             className="input"
  //           />
  //           <input
  //             name="area"
  //             value={formData.area}
  //             onChange={handleChange}
  //             placeholder="Area"
  //             className="input"
  //           />
  //           <input
  //             name="pincode"
  //             value={formData.pincode}
  //             onChange={handleChange}
  //             placeholder="Pincode"
  //             className="input"
  //           />
  //           <input
  //             name="googleMapLink"
  //             value={formData.googleMapLink}
  //             onChange={handleChange}
  //             placeholder="Google Map Link"
  //             className="input col-span-2"
  //           />
  //         </div>

  //         <div>
  //           <label className="block text-lg font-medium mb-2">Amenities</label>
  //           <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
  //             {amenitiesList.map((item, i) => (
  //               <label key={i} className="flex items-center space-x-2">
  //                 <input
  //                   type="checkbox"
  //                   value={item}
  //                   checked={formData.amenities?.includes(item)}
  //                   onChange={handleAmenityChange}
  //                 />
  //                 <span>{item}</span>
  //               </label>
  //             ))}
  //           </div>
  //         </div>

  //         <div>
  //           <label className="block text-lg font-medium mb-2">
  //             Upload Images (Max 5)
  //           </label>
  //           <input
  //             type="file"
  //             multiple
  //             accept="image/*"
  //             onChange={handleImageChange}
  //           />
  //           <p className="text-sm text-gray-500 mt-1">
  //             {existingImageUrls.length + newPreviewUrls.length} / 5 images
  //           </p>
  //           {(existingImageUrls.length > 0 || newPreviewUrls.length > 0) && (
  //             <div className="mt-4 flex flex-wrap gap-4">
  //               {existingImageUrls.map((url, i) => (
  //                 <div key={`existing-${i}`} className="relative">
  //                   <img
  //                     src={url}
  //                     alt="existing"
  //                     className="h-32 w-32 object-cover rounded-lg"
  //                   />
  //                   <button
  //                     type="button"
  //                     onClick={() => handleDeleteExistingImage(i)}
  //                     className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 text-xs"
  //                   >
  //                     ✕
  //                   </button>
  //                 </div>
  //               ))}

  //               {newPreviewUrls.map((preview, i) => (
  //                 <div key={`new-${i}`} className="relative">
  //                   <img
  //                     src={preview}
  //                     alt="new"
  //                     className="h-32 w-32 object-cover rounded-lg"
  //                   />
  //                   <button
  //                     type="button"
  //                     onClick={() => handleDeleteNewImage(i)}
  //                     className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 text-xs"
  //                   >
  //                     ✕
  //                   </button>
  //                 </div>
  //               ))}
  //             </div>
  //           )}
  //         </div>

  //         <div className="text-right">
  //           <button
  //             type="submit"
  //             className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
  //           >
  //             Update Hostel
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // );
};

export default EditHostelForm;
