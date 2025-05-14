import { apiServer } from "../../constant/api";

export const createActivityLogAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/activitylog/create`, data);
    return res?.data;
};

export const getActivityCardAPI = async (id: string): Promise<any> => {
    const res = await apiServer?.get(`/api/activitylog/get/` + id);
    return res?.data;
};