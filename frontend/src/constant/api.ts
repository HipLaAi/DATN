import axios from "axios";

export const apiServer = axios.create({
    baseURL: 'http://localhost:4040',
    withCredentials: true, //allow sent authenticate
});

apiServer.interceptors.request.use(
    (config) => {
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