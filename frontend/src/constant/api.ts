import axios from "axios";
import { refreshToken } from "../services/User/user.service";

export const apiServer = axios.create({
    baseURL: 'http://localhost:4040',
    withCredentials: true,
});

apiServer.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        if (config.data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data";
        } else {
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


apiServer.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const data = await refreshToken()
                localStorage.setItem("accessToken", data.accessToken)

                apiServer.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
                originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;

                return apiServer(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                window.location.href = "/login"
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);