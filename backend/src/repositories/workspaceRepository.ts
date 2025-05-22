import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { WorkspaceModel } from "../models/workspaceModel";

@injectable()
export class WorkspaceReponsitory {
    constructor(private db: Database) { };

    async createWorkspace(workspace: WorkspaceModel): Promise<any> {
        try {
            const sql = 'call CreateWorkspace(?, ?, ?, ?, ?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                workspace.name,
                workspace.description,
                workspace.status,
                workspace?.logo,
                workspace.user_id,
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateLogoWorkspace(workspace: WorkspaceModel): Promise<any> {
        try {
            const sql = 'call UpdateLogoWorkspace(?, ?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                workspace.workspace_id,
                workspace.logo
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateIWorkspace(workspace: WorkspaceModel): Promise<any> {
        try {
            const sql = 'call UpdateIWorkspace(?, ?, ?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                workspace.workspace_id,
                workspace.name,
                workspace.description,
                workspace.status,
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getWorkspaceById(workspace: WorkspaceModel): Promise<any> {
        try {
            const sql = 'call GetWorkspaceByID(?, ?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                workspace.workspace_id,
                workspace.user_id,
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteWorkspace(id: string): Promise<any> {
        try {
            const sql = 'call DeleteWorkspace(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [id]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async createMember(workspace: WorkspaceModel): Promise<any> {
        try {
            const sql = 'call CreateMember(?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                workspace.workspace_id,
                workspace.user_id,
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getAllWorkspaceByUserIdMember(id: string): Promise<any> {
        try {
            const sql = 'call GetAllWorkspaceByUserIdMember(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [id]);

            if (Array.isArray(results) && results.length > 0) {
                return results;
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getAllWorkspaceByUserIdGuest(id: string): Promise<any> {
        try {
            const sql = 'call GetAllWorkspaceByUserIdGuest(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [id]);

            if (Array.isArray(results) && results.length > 0) {
                return results;
            }
            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getMemberByWorkspaceID(id: string): Promise<any> {
        try {
            const sql = 'call GetMemberByWorkspaceID(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [id]);

            if (Array.isArray(results) && results.length > 0) {
                return results;
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getGuestByWorkspaceID(id: string): Promise<any> {
        try {
            const sql = 'call GetGuestByWorkspaceID(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [id]);

            if (Array.isArray(results) && results.length > 0) {
                return results;
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteMember(workspace: WorkspaceModel): Promise<any> {
        try {
            const sql = 'call DeleteMember(?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                workspace.workspace_id,
                workspace.user_id
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateRoleMember(workspace: WorkspaceModel): Promise<any> {
        try {
            const sql = 'call UpdateRoleMember(?, ?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                workspace.workspace_id,
                workspace.user_id,
                workspace.role,
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getSearch(search: string, userID: string): Promise<any> {
        try {
            const sql = 'call GetSearch(?, ?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [search, userID]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}