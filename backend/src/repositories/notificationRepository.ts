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

    async updateNotificationSent(): Promise<any> {
        try {
            const sql = 'call UpdateNotificationSent(@err_code, @err_msg)';
            await this.db.query(sql, []);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getNotificationRead(notification: NotificationModel): Promise<any> {
        try {
            const sql = 'call GetNotificationRead(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                notification.user_id
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results;
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateNotificationRead(notification: NotificationModel): Promise<any> {
        try {
            const sql = 'call UpdateNotificationRead(?, @err_code, @err_msg)';
            await this.db.query(sql, [
                notification.user_id,
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async createNotification(notification: NotificationModel): Promise<any> {
        try {
            const sql = 'call CreateNotification(?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                notification.user_id,
                notification.message
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}