import { apiServer } from "../../constant/api";


export const createCheckListNameAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/checklist/createname`, data);
    return res?.data;
};
export const updateCheckListNameAPI = async (id: any): Promise<any> => {
    const res = await apiServer?.post(`/api/checklist/updatename/`+id);
    return res?.data;
};
export const deleteCheckListNameAPI = async (id: any): Promise<any> => {
    const res = await apiServer?.delete(`/api/checklist/deletename/`+id);
    return res?.data;
};
export const createCheckListAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/checklist/create`,data);
    return res?.data;
};
export const deleteCheckListAPI = async (id: any): Promise<any> => {
    const res = await apiServer?.delete(`/api/checklist/delete/`+id);
    return res?.data;
};
export const updateCheckListAPI = async (id: any, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/checklist/update/`+id, data);
    return res?.data;
};