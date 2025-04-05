import { apiServer } from "../../constant/api";


export const createCardAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/card/create`, data);
    return res?.data;
};
export const updateUserOutCardAPI = async (id: any, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/card/updateuserout/`+id, data);
    return res?.data;
};
export const updateUserJoinCardAPI = async (id: any, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/card/updateuserjoin/`+id, data);
    return res?.data;
};
export const getCardByIddAPI = async (id: any): Promise<any> => {
    const res = await apiServer?.get(`/api/card/getbyid/`+id);
    return res?.data;
};

export const updateInformationCard = async (id: any, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/card/updateinformation/`+id, data);
    return res?.data;
};

export const getAllCardByBoardIdAPI = async (id: any): Promise<any> => {
    const res = await apiServer?.get(`/api/card/getallbyboardid/`+id);
    return res?.data;
};

export const deleteCardByIdAPI = async (id: any): Promise<any> => {
    const res = await apiServer?.delete(`/api/card/delete/`+id);
    return res?.data;
};

export const updateITimeCardAPI = async (id: any, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/card/updatetime/`+id, data);
    return res?.data;
};

export const updateCardByColumnIDAPI = async (id: any, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/card/updatebycolumnid/`+id, data);
    return res?.data;
};


export const getCardByColumnAPI = async (id: any): Promise<any> => {
    const res = await apiServer?.get(`/api/card/getbycolumn/`+id);
    return res?.data;
};


export const getCardByUserAPI = async (id: any): Promise<any> => {
    const res = await apiServer?.get(`/api/card/getbyuser/`+id);
    return res?.data;
};