import 'reflect-metadata';
import { Router } from "express";
import { container } from "tsyringe";
import { authenticate } from '../middlewares/authMiddleware';
import { NotificationController } from '../controllers/notificationController';

const notificationRouter = Router();
const notificationController = container.resolve(NotificationController);

notificationRouter.get(
    '/getnotification',
    authenticate,
    notificationController.getNotificationRead.bind(notificationController)
);

notificationRouter.post(
    '/updatenotification',
    authenticate,
    notificationController.updateNotificationRead.bind(notificationController)
);

notificationRouter.post(
    '/createnotification',
    authenticate,
    notificationController.createNotification.bind(notificationController)
);

export default notificationRouter;