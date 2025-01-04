import axios from 'axios';
import { API_URL } from '../config';
const URL = `${API_URL}/api/settings`;

export const updateSettings = async (settings) => {
  const response = await axios.put(URL, settings);
  return response.data;
};
