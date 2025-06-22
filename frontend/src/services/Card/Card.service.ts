import { apiServer } from "../../constant/api";


export const createCardAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/card/create`, data);
    return res?.data;
};
export const updateUserOutCardAPI = async (id: any, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/card/updateuserout/` + id, data);
    return res?.data;
};
export const updateUserJoinCardAPI = async (id: any, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/card/updateuserjoin/` + id, data);
    return res?.data;
};
export const getCardByIddAPI = async (id: any): Promise<any> => {
    const res = await apiServer?.get(`/api/card/getbyid/` + id);
    return res?.data;
};

export const updateInformationCard = async (id: any, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/card/updateinformation/` + id, data);
    return res?.data;
};

export const getAllCardByBoardIdAPI = async (id: any): Promise<any> => {
    const res = await apiServer?.get(`/api/card/getallbyboardid/` + id);
    return res?.data;
};

export const deleteCardByIdAPI = async (id: any): Promise<any> => {
    const res = await apiServer?.delete(`/api/card/delete/` + id);
    return res?.data;
};

export const updateITimeCardAPI = async (id: any, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/card/updatetime/` + id, data);
    return res?.data;
};

export const updateCardByColumnIDAPI = async (id: any, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/card/updatebycolumnid/` + id, data);
    return res?.data;
};


export const getCardByColumnAPI = async (id: any): Promise<any> => {
    const res = await apiServer?.get(`/api/card/getbycolumn/` + id);
    return res?.data;
};


export const getCardByUserAPI = async (id: any): Promise<any> => {
    const res = await apiServer?.get(`/api/card/getbyuser/` + id);
    return res?.data;
};

export const getCardEndDateAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/card/getcardenddate`, data);
    return res?.data;
};

export const getCardAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/card/getcard`, data);
    return res?.data;
};

export const getCardInWeekAPI = async (): Promise<any> => {
    const res = await apiServer?.get(`/api/card/getcardinweek`);
    return res?.data;
};

export const getCardDetailsInWeekAPI = async (): Promise<any> => {
    const res = await apiServer?.get(`/api/card/getcarddetailsinweek`);
    return res?.data;
};

export const updateStatusCardAPI = async (id: any, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/card/updatestatuscard/` + id, data);
    return res?.data;
};

export const getCardByStatusAPI = async (id: any): Promise<any> => {
    const res = await apiServer?.get(`/api/card/getbystatus/` + id);
    return res?.data;
};