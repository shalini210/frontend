import axios from 'axios';

const API_URL = 'http://localhost:5000/api/settings';

export const updateSettings = async (settings) => {
  const response = await axios.put(API_URL, settings);
  return response.data;
};
