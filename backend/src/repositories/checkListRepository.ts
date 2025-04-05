import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { CheckListModel } from "../models/checklistModel";

@injectable()
export class CheckListReponsitory {
    constructor(private db: Database) { };

    async createCheckListName(checkList: CheckListModel): Promise<any> {
        try {
            const sql = 'call CreateCheckListName(?, ?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                checkList.card_id,
                checkList.name
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateCheckListName(checkList: CheckListModel): Promise<any> {
        try {
            const sql = 'call UpdateCheckListName(?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                checkList.checklistname_id,
                checkList.name
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteCheckListName(id: string): Promise<any> {
        try {
            const sql = 'call DeleteCheckListName(?, @err_code, @err_msg)';
            await this.db.query(sql, [id]);
            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async createCheckList(checkList: CheckListModel): Promise<any> {
        try {
            const sql = 'call CreateCheckList(?, ?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                checkList.checklistname_id,
                checkList.name
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateCheckList(checkList: CheckListModel): Promise<any> {
        try {
            const sql = 'call UpdateCheckList(?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                checkList.checklist_id,
                checkList.user_id,
                checkList.name,
                checkList.timer,
                checkList.status,
                checkList.card_id,
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteCheckList(id: string): Promise<any> {
        try {
            const sql = 'call DeleteCheckList(?, @err_code, @err_msg)';
            await this.db.query(sql, [id]);
            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}