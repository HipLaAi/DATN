import cron from 'node-cron';
import { container } from "tsyringe";
import { io, activeUser } from "../server";
import { NotificationRepository } from '../repositories/notificationRepository';

const notificationRepository = container.resolve(NotificationRepository);

cron.schedule('*/10 * * * * *', async () => {
    try {
        const rows = await notificationRepository.getNotification();

        for (const notification of rows) {
            const user = activeUser.find((user) => user.userId === notification.user_id)
            if (user) {
                io.to(user.socketId).emit('notification', {
                    title: notification.user_id,
                    message: notification.message,
                    cardId: notification.card_id,
                });
            }
        }

    } catch (err) {
        console.error('Error sending notifications:', err);
    }
});
