import { apiServer } from "../../constant/api";

export const getSettingCardAPI = async (id: string): Promise<any> => {
    const res = await apiServer?.get(`/api/settingcard/getsettingcard/` + id);
    return res?.data;
};

export const updateSettingCardAPI = async (id: string, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/settingcard/updatesettingcard/` + id, data);
    return res?.data;
};