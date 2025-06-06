import apiInstance from "../interceptors/axios";

export const login = async (credentials) => {
  try {
    const response = await apiInstance.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    // The error message is already handled by the interceptor
    throw error; // Re-throw the error for component-level handling if needed
  }
};

export const logout = () => {
  localStorage.removeItem('viduthiiadmintoken');
};

export const getAuthToken = () => {
  return localStorage.getItem('viduthiiadmintoken');
};