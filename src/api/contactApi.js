import axios from 'axios';

const API_URL = 'http://localhost:5000/api/contacts';

export const getContacts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addContact = async (contact) => {
  const response = await axios.post(API_URL, contact);
  return response.data;
};
