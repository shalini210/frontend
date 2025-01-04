import axios from 'axios';

const API_URL = 'https://backend-ab2y-ikazrn0vs-shalini210s-projects.vercel.app/api/settings';

export const updateSettings = async (settings) => {
  const response = await axios.put(API_URL, settings);
  return response.data;
};
