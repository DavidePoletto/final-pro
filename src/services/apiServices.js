import axios from 'axios';

const API_BASE_URL = 'https://server-node-lcxi.onrender.com/api/auth';

export const login = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/login`, credentials);
  return response.data;
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response || error;
  }
};
