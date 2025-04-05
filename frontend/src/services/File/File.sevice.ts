import { apiServer } from "../../constant/api";


export const createFileAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/file/create`, data);
    return res?.data;
};

export const deleteFileAPI = async (id: any): Promise<any> => {
    const res = await apiServer?.delete(`/api/file/delete/`+id);
    return res?.data;
};
