import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { ActivityLogModel } from "../models/activityLogModels";

@injectable()
export class ActivityLogReponsitory {
    constructor(private db: Database) { };

    async createActivityCard(activitycard: ActivityLogModel): Promise<any> {
        try {
            const sql = 'call CreateActivityCard(?, ?, ?, @err_code, @err_msg)';
            const results = await this.db.query(sql, [
                activitycard.card_id,
                activitycard.user_id,
                activitycard.description,
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getActivityCard(activitycard: ActivityLogModel): Promise<any> {
        try {
            const sql = 'call GetActivityCardByID(?, @err_code, @err_msg)';
            const results = await this.db.query(sql, [
                activitycard.card_id,
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}