import { apiServer } from "../../constant/api";

export const login = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/login`, data);
    return res?.data;
};

export const googleLogin = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/googlelogin`, data);
    return res?.data;
};

export const refreshToken = async (): Promise<any> => {
    const res = await apiServer?.post(`/api/refreshtoken/`);
    return res?.data;
};

export const register = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/register`, data);
    return res?.data;
};

export const search = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/search`, data);
    return res?.data;
};

export const getUserGrowthRateAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.get(`/api/getusergrowthrate/` + data);
    return res?.data;
};

export const getNewUserAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.get(`/api/getnewuser/` + data);
    return res?.data;
};

export const getActivityUserAPI = async (): Promise<any> => {
    const res = await apiServer?.get(`/api/getactivityuser`);
    return res?.data;
};

export const getAllUserAPI = async (): Promise<any> => {
    const res = await apiServer?.get(`/api/getalluser`);
    return res?.data;
};

export const getActivityUserByRangeAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.get(`/api/getactivityuserbyrange/` + data);
    return res?.data;
};

export const sendVerificationEmail = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/sendverificationemail`, data);
    return res?.data;
};

export const logout = async (): Promise<any> => {
    const res = await apiServer?.post(`/api/logout`);
    return res?.data;
};