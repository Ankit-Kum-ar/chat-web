import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://chatty-abml.onrender.com/api/v1",
    withCredentials: true,
})