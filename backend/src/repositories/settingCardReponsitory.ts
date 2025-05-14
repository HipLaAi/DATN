import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { SettingCardModel } from "../models/settingCardModel";

@injectable()
export class SettingCardReponsitory {
    constructor(private db: Database) { };

    async getSettingCardById(settingCard: SettingCardModel): Promise<any> {
        try {
            const sql = 'call GetSettingCardByID(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                settingCard.card_id
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results;
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateSettingCard(settingCard: SettingCardModel): Promise<any> {
        try {
            const sql = 'call UpdateSettingCard(?, ?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                settingCard.card_id,
                settingCard.action,
                settingCard.permission
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}