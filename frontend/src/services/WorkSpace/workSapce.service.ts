import { apiServer } from "../../constant/api";


export const getGuestByWorkspaceIdAPI = async (id: any): Promise<any> => {
    const res = await apiServer?.get(`/api/workspace/getguestbyworkspaceid/` + id);
    return res?.data;
};

export const getMemberByWorkspaceIdAPI = async (id: any): Promise<any> => {
    const res = await apiServer?.get(`/api/workspace/getmemberbyworkspaceid/` + id);
    return res?.data;
};

export const getWorkSpaceMemberByIdUserAPI = async (): Promise<any> => {
    const res = await apiServer?.get(`/api/workspace/getallbyuseridmember/`);
    return res?.data;
};
export const getWorkSpaceGuestByIdUserAPI = async (): Promise<any> => {
    const res = await apiServer?.get(`/api/workspace/getallbyuseridguest/`);
    return res?.data;
};

export const getWorkSpacedByIdAPI = async (id: any): Promise<any> => {
    const res = await apiServer?.get(`/api/workspace/getbyid/`+id);
    return res?.data;
};

export const createWorkSpacedAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/workspace/create`, data);
    return res?.data;
};
export const createMemberdAPI = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/workspace/createmember`, data);
    return res?.data;
};

export const deleteWorkspaceAPI = async (id: any): Promise<any> => {
    const res = await apiServer?.delete(`/api/workspace/delete/` + id);
    return res?.data;
};

export const deleteMemberAPI = async (id: any, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/workspace/deletemember/` + id, data);
    return res?.data;
};