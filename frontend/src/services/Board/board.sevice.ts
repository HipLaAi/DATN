import { apiServer } from "../../constant/api";

export const getBoarByIdAPI = async (id: any): Promise<any> => {
    const res = await apiServer?.get(`/api/board/getbyid/`+id);
    return res?.data;
};
export const createBoardAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/board/create`, data);
    return res?.data;
};
export const updateBoarDetailsdAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/board/updatewhenmovecolumn`, data);
    return res?.data;
};
export const createGuestdAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/board/createguest`, data);
    return res?.data;
};

export const getBoardByCustomAPI = async (id: any, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/board/getboardbycustom/` + id, data);
    return res?.data;
};

export const deleteGuestAPI = async (id: any, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/board/deleteguest/` + id, data);
    return res?.data;
};

export const deleteBoardAPI = async (id: any): Promise<any> => {
    const res = await apiServer?.delete(`/api/board/delete/` + id);
    return res?.data;
};