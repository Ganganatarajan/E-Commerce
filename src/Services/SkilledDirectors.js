import apiInstance from "../interceptors/axios";
import { message } from "antd";

export const createDirectors = async (formData) => {
  try {
    const res = await apiInstance.post("/skilldirectory/createskill", formData, {
    });

    message.success("Director created successfully!");
    return res.data;
  } catch (err) {
    console.error("Director Create Error:", err.response?.data || err);
    message.error("Director creation failed.");
    throw err;
  }
};

export const getAllDirectors = async () => {
  try {
    const response = await apiInstance.get("/skilldirectory/getall");
    return response.data;
  } catch (err) {
    console.error("Get All Directors Error:", err.response?.data || err);
    message.error("Failed to fetch directors.");
    throw err;
  }
};

export const getDirectorsById = async (id) => {
  try {
    const res = await apiInstance.get(`/skilldirectory/get/${id}`);
    return res.data;
  } catch (err) {
    console.error("Get Director By ID Error:", err.response?.data || err);
    message.error("Failed to fetch director.");
    throw err;
  }
};

export const updateDirectors = async (id, formData) => {
  try {
    const res = await apiInstance.put(`/skilldirectory/update/${id}`, formData, {
      
    });

    message.success("Director updated successfully!");
    return res.data;
  } catch (err) {
    console.error("Director Update Error:", err.response?.data || err);
    message.error("Director update failed.");
    throw err;
  }
};

export const deleteDirectors = async (id) => {
  try {
    const res = await apiInstance.delete(`/skilldirectory/delete/${id}`);
    message.success("Director deleted successfully!");
    return res.data;
  } catch (err) {
    console.error("Director Delete Error:", err.response?.data || err);
    message.error("Director deletion failed.");
    throw err;
  }
};