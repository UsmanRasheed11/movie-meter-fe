
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // Update with your API URL
});

export default api;
