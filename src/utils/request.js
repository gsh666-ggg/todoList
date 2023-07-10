import axios from "axios";

const service = axios.create({
    baseURL : "http://127.0.0.1/todoList/api",
    timeout : 5000
});

service.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

service.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
});

export default service;