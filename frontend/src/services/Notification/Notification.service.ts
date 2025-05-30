import { apiServer } from "../../constant/api";

export const getNotificationAPI = async (): Promise<any> => {
    const res = await apiServer?.get(`/api/notification/getnotification`);
    return res?.data;
};

export const updateNotificationAPI = async (): Promise<any> => {
    const res = await apiServer?.post(`/api/notification/updatenotification`);
    return res?.data;
};

export const createNotificationAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/notification/createnotification`, data);
    return res?.data;
};
