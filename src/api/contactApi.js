import axios from 'axios';
import { API_URL } from '../config';
// const API_URL = 'https://backend-ab2y-ikazrn0vs-s
// halini210s-projects.vercel.app/api/contacts';

export const getContacts = async () => {
  let URL = `${API_URL}/api/contacts`
  const response = await axios.get(URL);
  console.log(response.data)
  return response.data;
};

export const addContact = async (contact) => {
  const response = await axios.post(URL, contact);
  return response.data;
};
