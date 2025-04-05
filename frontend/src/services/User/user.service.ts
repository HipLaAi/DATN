import { apiServer } from "../../constant/api";


export const login = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/login`, data);
    return res?.data;
};
export const register = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/register`,data);
    return res?.data;
};
export const search = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/search`,data);
    return res?.data;
};