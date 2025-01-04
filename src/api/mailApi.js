import axios from 'axios';

const API_URL = 'https://backend-ab2y-ikazrn0vs-shalini210s-projects.vercel.app/api/mail/send';

export const sendMail = async (mailData) => {
  const response = await axios.post(API_URL, mailData);
  return response.data;
};
