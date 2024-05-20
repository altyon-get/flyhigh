import axios from 'axios';

const API_URL = 'http://localhost:3000/api/flight';

export const fetchPlanes = async () => {
  const response = await axios.get(API_URL);
  if (response.data.isSuccess) {
    return response.data.response;
  }
  throw new Error('Failed to fetch cords');
};