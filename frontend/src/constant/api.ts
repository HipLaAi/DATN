import axios from "axios";
import { refreshToken } from "../services/User/user.service";
import { createActivityUserAPI } from "../services/ActivityLog/ActivityLog.service";
import decodeJWT from "../services/Auth/auth.service ";

async function getIPAddress() {
    try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        return data.ip; // Địa chỉ IP
    } catch (error) {
        console.error("Could not fetch IP address:", error);
        return null;
    }
}

function getDeviceAndBrowser() {
    const userAgent = navigator.userAgent;

    // Xác định loại thiết bị
    let device = "Desktop";
    if (/Mobi|Android/i.test(userAgent)) {
        device = "Mobile";
    } else if (/Tablet|iPad/i.test(userAgent)) {
        device = "Tablet";
    }

    // Xác định trình duyệt
    let browser = "Unknown";
    if (userAgent.indexOf("Edg") > -1) {
        browser = "Edge";
    } else if (userAgent.indexOf("OPR") > -1 || userAgent.indexOf("Opera") > -1) {
        browser = "Opera";
    } else if (userAgent.indexOf("CocCoc") > -1) {
        browser = "Cốc Cốc";
    } else if (userAgent.indexOf("Chrome") > -1) {
        browser = "Chrome";
    } else if (userAgent.indexOf("Safari") > -1) {
        browser = "Safari";
    } else if (userAgent.indexOf("Firefox") > -1) {
        browser = "Firefox";
    }
    return { device, browser };
}

async function logUserActivity(action: any, status: any) {
    const ipAddress = await getIPAddress();
    const { device, browser } = getDeviceAndBrowser();
    const token = localStorage.getItem('accessToken') as string;
    const userInfo = decodeJWT(token);
    const userID = userInfo.user_id;
    const url = window.location.pathname;

    const activityLog = {
        user_id: userID,
        action: action,
        ip_address: ipAddress,
        device,
        browser,
        url: url,
        status: status,
    };

    try {
        await createActivityUserAPI(activityLog);
        console.log("Log saved successfully");
    } catch (error) {
        console.error("Failed to save log:", error);
    }
}

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
                logUserActivity("refreshToken", "Success")
                return apiServer(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                window.location.href = "/login"
                logUserActivity("refreshToken", "Failure")
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);