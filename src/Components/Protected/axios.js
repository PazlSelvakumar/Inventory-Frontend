import axios from "axios";

// Set up default axios instance
const axiosInstance = axios.create({
    baseURL:'http://127.0.0.1:8000/api',
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token =sessionStorage.getItem('token');

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

export default axiosInstance;