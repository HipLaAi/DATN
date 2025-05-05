import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { SettingWorkspaceModel } from "../models/settingWorkspaceModel";

@injectable()
export class SettingWorkspaceReponsitory {
    constructor(private db: Database) { };

    async getSettingWorkspaceById(settingWorkspace: SettingWorkspaceModel): Promise<any> {
        try {
            const sql = 'call GetSettingWorkspaceByID(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                settingWorkspace.workspace_id
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateSettingWorkspace(settingWorkspace: SettingWorkspaceModel): Promise<any> {
        try {
            const sql = 'call UpdateSettingWorkspace(?, ?, ?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                settingWorkspace.settingworkspace_id,
                settingWorkspace.workspace_id,
                settingWorkspace.action,
                JSON.stringify(settingWorkspace.permission)
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}