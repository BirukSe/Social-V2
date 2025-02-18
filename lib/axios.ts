import axios from 'axios';

// Create an instance of Axios with a base URL and other default configurations
const axiosInstance = axios.create({
  baseURL: 'http:localhost:3000', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
