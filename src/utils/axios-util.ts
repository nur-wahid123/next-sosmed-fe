// utils/axios.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Set your API base URL here
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the authorization token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Replace this with however you store the token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Attach the token
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
