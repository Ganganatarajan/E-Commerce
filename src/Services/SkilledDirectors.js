import apiInstance from "../interceptors/axios";
import { message } from "antd";

export const createDirectors = async (data) => {
  try {
    const res = await apiInstance.post("/skilldirectory/createskill", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    message.success("Job created successfully!");
    return res.data;
  } catch (err) {
    console.error("skilldirectory Create Error:", err.response?.data || err);
    message.error("skilldirectory creation failed.");
    throw err;
  }
};

export const getAllDirectors = async () => {
  try {
    const response = await apiInstance.get("/skilldirectory/getall");
    return response.data;
  } catch (err) {
    console.error("Get All skilldirectory Error:", err.response?.data || err);
    message.error("Failed to fetch skilldirectory.");
    throw err;
  }
};

export const getDirectorsById = async (id) => {
  try {
    const res = await apiInstance.get(`/skilldirectory/get/${id}`);
    return res.data;
  } catch (err) {
    console.error("Get skilldirectory By ID Error:", err.response?.data || err);
    message.error("Failed to fetch skilldirectory.");
    throw err;
  }
};

export const updateDirectors = async (id, data) => {
  try {
    const res = await apiInstance.put(`/skilldirectory/update/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    message.success("skilldirectory updated successfully!");
    return res.data;
  } catch (err) {
    console.error("skilldirectory Update Error:", err.response?.data || err);
    message.error("skilldirectory update failed.");
    throw err;
  }
};

export const deleteDirectors = async (id) => {
  try {
    const res = await apiInstance.delete(`/skilldirectory/delete/${id}`);
    message.success("skilldirectory deleted successfully!");
    return res.data;
  } catch (err) {
    console.error("skilldirectory Delete Error:", err.response?.data || err);
    message.error("skilldirectory deletion failed.");
    throw err;
  }
};