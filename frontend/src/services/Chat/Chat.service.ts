import { apiServer } from "../../constant/api";

export const chatAIAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/chat/ai`, data);
    return res?.data;
};