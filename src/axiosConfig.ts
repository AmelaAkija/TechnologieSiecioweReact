import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080', // Base URL for the API
});

// Set up Axios to use JWT token from local storage
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
