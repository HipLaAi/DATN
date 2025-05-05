import { apiServer } from "../../constant/api";

export const getSettingWorkspaceAPI = async (id: string): Promise<any> => {
    const res = await apiServer?.get(`/api/settingworkspace/getsettingworkspace/` + id);
    return res?.data;
};

export const updateSettingWorkspaceAPI = async (id: string, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/settingworkspace/updatesettingworkspace/` + id, data);
    return res?.data;
};