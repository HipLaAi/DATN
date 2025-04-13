import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { NotificationModel } from "../models/notificationModel";

@injectable()
export class NotificationRepository {
    constructor(private db: Database) { };

    async getNotification(): Promise<any> {
        try {
            const sql = 'call GetNotificationByUserId(@err_code, @err_msg)';
            const [results] = await this.db.query(sql, []);

            if (Array.isArray(results) && results.length > 0) {
                return results;
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}