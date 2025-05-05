import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://chatty-k1zj.onrender.com/api/v1",
    withCredentials: true,
})