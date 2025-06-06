import apiInstance from "../interceptors/axios";

export const CreateHotel = async (data) => {
  const response = await apiInstance.post("/hotel/create", data);
  return response;
};
export const EditHotel = async (data, id) => {
  const response = await apiInstance.put(`/hotel/create/${id}`, data);
  return response;
};

export const GetHotel = async () => {
  const response = await apiInstance.get("hotel/get-all");
  return response;
};
export const GetIdHotel = async (id) => {
  const response = await apiInstance.get(`hostel/get/${id}`);
  return response;
};
