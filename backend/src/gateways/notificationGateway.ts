import { io, activeUser } from "../server";

interface Notification {
    user_id: string;
    message: string;
    card_id: string;
}

export class NotificationGateway {
    public sendNotifications(notifications: Notification[]): void {
        for (const notification of notifications) {
            const user = activeUser.find((user) => user.userId === notification.user_id);
            if (user) {
                io.to(user.socketId).emit('notification', {
                    title: notification.user_id,
                    message: notification.message,
                    cardId: notification.card_id,
                });
            }
        }
    }
}
