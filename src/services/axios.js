import axios from 'axios';
import { API_CONFIG } from '../config/constants';

const TOKEN = 'c0ebf0767ff01731313ccc7da779abdc28b4b3562c2f04d06b000976a790662853865438ef7aab167a78be1dac5cdfbe1255bad146657fb19ac7da0bbce28e505e61c08f80b2aecb13f1b8f0e06a65895bf9e759d70f036ad77ad5f791f0261214b44fd6f09ebcc49405e8c6dfb189d28044190fb60c750cb7fb494b3c8796f7';

const axiosInstance = axios.create({
  baseURL: 'https://sshe2025.hnue.edu.vn/v2/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Ensure token is always present in headers
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${TOKEN}`;
    }

    // Get locale from URL path
    const locale = typeof window !== 'undefined'
      ? window.location.pathname.split('/')[1]
      : 'vi';

    // Add locale to query params if not already present
    if (!config.params?.locale) {
      config.params = {
        ...config.params,
        'locale': locale
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle errors here
    if (error.response?.status === 401) {
      console.error('Authentication error: Token might be invalid or expired');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 