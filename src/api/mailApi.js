import axios from 'axios';

const API_URL = 'http://localhost:5000/api/mail/send';

export const sendMail = async (mailData) => {
  const response = await axios.post(API_URL, mailData);
  return response.data;
};
