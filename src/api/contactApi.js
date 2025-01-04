import axios from 'axios';

const API_URL = 'https://backend-ab2y-ikazrn0vs-shalini210s-projects.vercel.app/api/contacts';

export const getContacts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addContact = async (contact) => {
  const response = await axios.post(API_URL, contact);
  return response.data;
};
