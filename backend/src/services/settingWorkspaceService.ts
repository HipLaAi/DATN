import { injectable } from "tsyringe";
import { SettingWorkspaceReponsitory } from "../repositories/settingWorkspaceReponsitory";
import { SettingWorkspaceModel } from "../models/settingWorkspaceModel";

@injectable()
export class SettingWorkspaceService {
    constructor(private settingWorkspaceReponsitory: SettingWorkspaceReponsitory) { };

    async getSettingWorkspaceById(settingWorkspace: SettingWorkspaceModel): Promise<any> {
        return this.settingWorkspaceReponsitory.getSettingWorkspaceById(settingWorkspace);
    }

    async updateSettingWorkspace(settingWorkspace: SettingWorkspaceModel): Promise<any> {
        return this.settingWorkspaceReponsitory.updateSettingWorkspace(settingWorkspace);
    }
}