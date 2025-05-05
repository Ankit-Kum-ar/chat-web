import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:[ "https://chatty-abml.onrender.com/api/v1", "http://localhost:5000/api/v1" ], // Base URL for the API
    withCredentials: true,
})