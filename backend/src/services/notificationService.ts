import { injectable } from "tsyringe";
import { NotificationRepository } from "../repositories/notificationRepository";
import { NotificationModel } from "../models/notificationModel";


@injectable()
export class NotificationService {
    constructor(private notificationReponsitory: NotificationRepository) { };

    async getNotificationRead(notification: NotificationModel): Promise<any> {
        return this.notificationReponsitory.getNotificationRead(notification);
    }

    async updateNotificationRead(notification: NotificationModel): Promise<any> {
        return this.notificationReponsitory.updateNotificationRead(notification);
    }

    async createNotification(notification: NotificationModel): Promise<any> {
        return this.notificationReponsitory.createNotification(notification);
    }
}