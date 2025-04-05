import { apiServer } from "../../constant/api";


export const createColumndAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/column/create`, data);
    return res?.data;
};
export const updateColumndAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/column/updatewhenmovecard/`, data);
    return res?.data;
};
export const deleteColumndAPI = async (id: any): Promise<any> => {
    const res = await apiServer?.delete(`/api/column/delete/`+ id);
    return res?.data;
};

export const getAllColumnByBoardIdAPI = async (id: any): Promise<any> => {
    const res = await apiServer?.get(`/api/column/getallbyboardid/`+ id);
    return res?.data;
};
