import axios from "axios";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";
import i18next from "i18next";

const axiosInstance = axios.create({
    // baseURL: 'http://0.0.0.0:8080/api', // local
    // baseURL: "http://46.4.19.119:8080/api", // dev
    baseURL: "http://37.27.102.81:8080/api", // prod
});

// Request interceptor to add auth token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const { authToken } = useUserStore.getState();

        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Response interceptor for handling token expiration or other responses
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error?.response?.data?.error?.message) {
            toast.error(i18next.t(error.response.data.error.message));
        }
        if (error.response && error.response.status === 401) {
            const { logOut } = useUserStore.getState();
            logOut();
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
