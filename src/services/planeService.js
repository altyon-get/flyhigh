import axios from 'axios';

const API_URL = 'http://localhost:3000/api/airplane';

export const fetchPlaneNames = async () => {
  try {
    const response = await axios.get(API_URL);
    if (response.data.isSuccess) {
     console.log(response.data.response);
      return response.data.response;
    }
    throw new Error('Failed to fetch plane names');
  } catch (error) {
    console.error('Error fetching plane names:', error);
    throw error;
  }
};
