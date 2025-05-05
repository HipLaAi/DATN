import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { SettingBoardModel } from "../models/settingBoardModel";

@injectable()
export class SettingBoardReponsitory {
    constructor(private db: Database) { };

    async getSettingBoardById(settingBoard: SettingBoardModel): Promise<any> {
        try {
            const sql = 'call GetSettingBoardByID(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                settingBoard.board_id
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results;
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateSettingBoard(settingBoard: SettingBoardModel): Promise<any> {
        try {
            const sql = 'call UpdateSettingBoard(?, ?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                settingBoard.board_id,
                settingBoard.action,
                settingBoard.permission
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}