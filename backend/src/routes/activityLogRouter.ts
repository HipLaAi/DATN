import 'reflect-metadata';
import { Router } from "express";
import { container } from "tsyringe";
import { authenticate } from '../middlewares/authMiddleware';
import { ActivityLogController } from '../controllers/activityLogController';

const activityLogRouter = Router();
const activityLogController = container.resolve(ActivityLogController);

activityLogRouter.post(
    '/create',
    authenticate,
    activityLogController.createActivityLog.bind(activityLogController)
);

activityLogRouter.get(
    '/get/:idCard',
    authenticate,
    activityLogController.getActivityCard.bind(activityLogController)
);

export default activityLogRouter;