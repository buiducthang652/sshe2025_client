import axios from 'axios';

const TOKEN = 'ebf165ddd037bcee9cfcf7e2720f59235c6cb9cbfc653bba8cd135e69bfb5ac0c64fcef5e5cea73a14380773a5f0414f4c9d3fcf54b24219de44bbf9b77984aa01fdcae88654913fffa26205479b710d9589e30d25735eeea847f1b0c50937bae0528cf29264acd8ddbc2fea45c2abbd8a43ec37b1b7cc010efec710330bbe8a';

const axiosInstance = axios.create({
  baseURL: 'https://sshe2025.hnue.edu.vn/v2/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`,
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Ensure token is always present in headers
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${TOKEN}`;
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