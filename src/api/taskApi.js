import axios from 'axios';

const API_URL = 'https://backend-ab2y-ikazrn0vs-shalini210s-projects.vercel.app/api/tasks';

export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};
