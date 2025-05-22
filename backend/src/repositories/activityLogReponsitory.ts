import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { ActivityLogModel } from "../models/activityLogModels";

@injectable()
export class ActivityLogReponsitory {
    constructor(private db: Database) { };

    async createActivityCard(activityLog: ActivityLogModel): Promise<any> {
        try {
            const sql = 'call CreateActivityCard(?, ?, ?, @err_code, @err_msg)';
            const results = await this.db.query(sql, [
                activityLog.card_id,
                activityLog.user_id,
                activityLog.description,
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getActivityCard(activityLog: ActivityLogModel): Promise<any> {
        try {
            const sql = 'call GetActivityCardByID(?, @err_code, @err_msg)';
            const results = await this.db.query(sql, [
                activityLog.card_id,
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async createActivityUser(activityLog: ActivityLogModel): Promise<any> {
        try {
            const sql = 'call CreateActivityUser(?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                activityLog.user_id,
                activityLog.action,
                activityLog.ip_address,
                activityLog.device,
                activityLog.browser,
                activityLog.url,
                activityLog.status,
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}