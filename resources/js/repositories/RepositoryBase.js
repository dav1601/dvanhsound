import axios from "axios";
const baseDomain = "http://dvanhsound.local";
const baseUrl = `${baseDomain}/api`;
import Cookies from "js-cookie";
import { handleApiError } from "@/api/ErrorHandler";
const axiosInstance = axios.create({
    baseURL: baseUrl,
});
axiosInstance.interceptors.request.use(
    (config) => {
        // Lấy token xác thực từ nơi nào đó (localStorage, Vuex Store, etc.)
        const token = Cookies.get("dvanhsound_token");
        // Thêm token vào headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        handleApiError(error);
        return Promise.reject(error);
    }
);
export default axiosInstance;
