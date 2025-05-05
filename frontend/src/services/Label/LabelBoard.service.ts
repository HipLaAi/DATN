import { apiServer } from "../../constant/api";

export const getLabelBoardAPI = async (id: string): Promise<any> => {
    const res = await apiServer?.get(`/api/labelboard/getlabelboard/` + id);
    return res?.data;
};

export const createLabelBoardAPI = async (id: string, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/labelboard/createlabelboard/` + id, data);
    return res?.data;
};

export const updateLabelBoardAPI = async (id: string, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/labelboard/updatelabelboard/` + id, data);
    return res?.data;
};

export const deleteLabelBoardAPI = async (id: string): Promise<any> => {
    const res = await apiServer?.delete(`/api/labelboard/deletelabelboard/` + id);
    return res?.data;
};

export const createLabelAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/labelboard/createlabel`, data);
    return res?.data;
};

export const deleteLabelAPI = async (id: string): Promise<any> => {
    const res = await apiServer?.delete(`/api/labelboard/deletelabel/` + id);
    return res?.data;
};