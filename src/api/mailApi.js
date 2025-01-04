import axios from 'axios';
import { API_URL } from '../config';
const url = `${API_URL}/api/mail/send`;

export const sendMail = async (mailData) => {
  const response = await axios.post(URL, mailData);
  return response.data;
};
