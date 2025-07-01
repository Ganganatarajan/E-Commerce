import apiInstance from "../interceptors/axios";
import { message } from "antd";

export const createJob = async (data) => {
  try {
    const res = await apiInstance.post("/jobs/createjob", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    message.success("Job created successfully!");
    return res.data;
  } catch (err) {
    console.error("Job Create Error:", err.response?.data || err);
    message.error("Job creation failed.");
    throw err;
  }
};

export const getAllJobs = async () => {
  try {
    const response = await apiInstance.get("/jobs/getall");
    return response.data;
  } catch (err) {
    console.error("Get All Jobs Error:", err.response?.data || err);
    message.error("Failed to fetch jobs.");
    throw err;
  }
};

export const getJobById = async (id) => {
  try {
    const res = await apiInstance.get(`/jobs/get/${id}`);
    return res.data;
  } catch (err) {
    console.error("Get Job By ID Error:", err.response?.data || err);
    message.error("Failed to fetch job.");
    throw err;
  }
};

export const updateJob = async (id, data) => {
  try {
    const res = await apiInstance.put(`/jobs/update/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    message.success("Job updated successfully!");
    return res.data;
  } catch (err) {
    console.error("Job Update Error:", err.response?.data || err);
    message.error("Job update failed.");
    throw err;
  }
};

export const deleteJob = async (id) => {
  try {
    const res = await apiInstance.delete(`/jobs/delete/${id}`);
    message.success("Job deleted successfully!");
    return res.data;
  } catch (err) {
    console.error("Job Delete Error:", err.response?.data || err);
    message.error("Job deletion failed.");
    throw err;
  }
};