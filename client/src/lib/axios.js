import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://chattera-enm2.onrender.com/api/v1",
    withCredentials: true,
})