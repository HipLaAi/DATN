import { apiServer } from "../../constant/api";


export const converSationAPI = async (): Promise<any> => {
    const res = await apiServer?.get(`/api/conversation/getconversationbyuserid`);
    return res?.data;
};
export const createconverSationAPI = async (data:any): Promise<any> => {
    const res = await apiServer?.post(`/api/conversation/create`, data);
    return res?.data;
};
