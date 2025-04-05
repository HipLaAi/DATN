import { apiServer } from "../../constant/api";


export const getMessageAPI = async (id:string): Promise<any> => {
    const res = await apiServer?.get(`/api/message/getmessagebyconversationid/`+id);
    return res?.data;
};
export const createMessageAPI = async (data:any): Promise<any> => {
    const res = await apiServer?.post(`/api/message/create/`, data);
    return res?.data;
};
