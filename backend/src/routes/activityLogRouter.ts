import 'reflect-metadata';
import { Router } from "express";
import { container } from "tsyringe";
import { authenticate } from '../middlewares/authMiddleware';
import { ActivityLogController } from '../controllers/activityLogController';

const activityLogRouter = Router();
const activityLogController = container.resolve(ActivityLogController);

activityLogRouter.post(
    '/createcard',
    authenticate,
    activityLogController.createActivityCard.bind(activityLogController)
);

activityLogRouter.get(
    '/get/:idCard',
    authenticate,
    activityLogController.getActivityCard.bind(activityLogController)
);

activityLogRouter.post(
    '/createuser',
    activityLogController.createActivityUser.bind(activityLogController)
);

export default activityLogRouter;