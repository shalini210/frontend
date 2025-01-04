import axios from 'axios';
import { API_URL } from '../config';
const URL = `${API_URL}/api/tasks`;

export const getTasks = async () => {
  const response = await axios.get(URL);
  return response.data;
};

export const addTask = async (task) => {
  const response = await axios.post(URL, task);
  return response.data;
};
