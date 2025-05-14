import { apiServer } from "../../constant/api";

export const createCommentAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/comment/create`, data);
    return res?.data;
};

export const updateCommentAPI = async (id: string, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/comment/update/` + id, data);
    return res?.data;
};

export const deleteCommentAPI = async (id: string): Promise<any> => {
    const res = await apiServer?.delete(`/api/comment/delete/` + id);
    return res?.data;
};