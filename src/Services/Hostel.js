




// import apiInstance from "../interceptors/axios";
// import { message } from "antd";

// export const createHostel = async (formData) => {
//   try {
//     const res = await apiInstance.post("/hostel/create", formData);
//     message.success("Hostel created successfully!");
//     return res.data;
//   } catch (err) {
//     console.error("Hostel Create Error:", err);
//     message.error("Hostel creation failed.");
//     throw err;
//   }
// };

import apiInstance from '../interceptors/axios';

import { message } from "antd";

export const createHostel = async (data) => {
  try {
    const formData = new FormData();

    formData.append("hostelName", data.hostelName);
    formData.append("numberOfRooms", data.noOfRooms);
    formData.append("numberOfOccupancies", data.noOfOccupancies);
    formData.append("contactPerson", data.contactPerson);
    formData.append("mobileNumber", data.mobileNumber);
    formData.append("mailId", data.mailId);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("area", data.area);
    formData.append("pincode", data.pincode);
    formData.append("googleMapLink", data.googleMapLink);


    data.amenities?.forEach((item) => {
      formData.append("amenities", item);
    });

    data.hostelImages.forEach((file) => {
      formData.append("hostelImages", file);
    });

    const res = await apiInstance.post("/hostel/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    message.success("Hostel created successfully!");
    return res.data;
  } catch (err) {
    console.error("Hostel Create Error:", err.response?.data || err);
    message.error("Hostel creation failed.");
    throw err;
  }
};


export const GetHostel = async () => {
  const response = await apiInstance.get('hostel/get-all');
  return response;
}


export const getHostelById = async (id) => {
  const res = await apiInstance.get(`http://localhost:7055/v1/hostel/get/${id}`);
  return res.data;
};

export const updateHostel = async (id, data) => {
  const res = await apiInstance.put(`http://localhost:7055/v1/hostel/update/${id}`, data);
  return res.data;
};