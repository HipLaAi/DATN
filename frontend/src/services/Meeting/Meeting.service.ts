import axios from 'axios';

const API_BASE_URL = 'http://localhost:4040/api/meeting';

export const getAuthUrl = async (): Promise<string> => {
  const response = await axios.get(`${API_BASE_URL}/auth-url`);
  return response.data.url;
};

export const createMeet = async (eventData: {
  summary: string;
  startTime: string;
  endTime: string;
  attendees: any[];
}): Promise<string> => {
  const response = await axios.post(`${API_BASE_URL}/create-meet`, eventData);
  return response.data.meetLink;
};