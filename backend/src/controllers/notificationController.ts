import { injectable } from "tsyringe";
import { Request, Response } from 'express';
import { NotificationService } from "../services/notificationService";

@injectable()
export class NotificationController {
    constructor(private notificationService: NotificationService) { }

    async getNotificationRead(req: Request, res: Response): Promise<any> {
        try {
            const user = (req as any).user;

            const results = await this.notificationService.getNotificationRead({
                user_id: user.user_id,
            });
            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async updateNotificationRead(req: Request, res: Response): Promise<any> {
        try {
            const user = (req as any).user;

            const results = await this.notificationService.updateNotificationRead({
                user_id: user.user_id,
            });
            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async createNotification(req: Request, res: Response): Promise<any> {
        try {
            const { user_id, message } = req.body;

            const results = await this.notificationService.createNotification({
                user_id: user_id,
                message: message
            });
            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }
}