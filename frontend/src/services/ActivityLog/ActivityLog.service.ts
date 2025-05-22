import { apiServer } from "../../constant/api";

export const createActivityCardAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/activitylog/createcard`, data);
    return res?.data;
};

export const getActivityCardAPI = async (id: string): Promise<any> => {
    const res = await apiServer?.get(`/api/activitylog/get/` + id);
    return res?.data;
};

export const createActivityUserAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/activitylog/createuser`, data);
    return res?.data;
};