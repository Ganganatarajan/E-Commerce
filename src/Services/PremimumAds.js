import apiInstance from "../interceptors/axios";

export const CreatePremimumAds = async (data) => {
  const response = await apiInstance.post("premiumAds/create", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response;
};