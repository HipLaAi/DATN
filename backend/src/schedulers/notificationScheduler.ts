import cron from 'node-cron';
import { container } from "tsyringe";
import { NotificationGateway } from '../gateways/notificationGateway';
import { NotificationRepository } from '../repositories/notificationRepository';

const notificationRepository = container.resolve(NotificationRepository);
const notificationGateway = new NotificationGateway();

cron.schedule('*/1 * * * * *', async () => {
    try {
        const notifications = await notificationRepository.getNotification();

        if (!Array.isArray(notifications) || notifications.length === 0) {
            return;
        }

        notificationGateway.sendNotifications(notifications);
    } catch (err) {
        console.error('Error in Notification Scheduler:', err);
    }
});