import { apiServer } from "../../constant/api";

export const getSettingBoardAPI = async (id: string): Promise<any> => {
    const res = await apiServer?.get(`/api/settingboard/getsettingboard/` + id);
    return res?.data;
};

export const updateSettingBoardAPI = async (id: string, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/settingboard/updatesettingboard/` + id, data);
    return res?.data;
};