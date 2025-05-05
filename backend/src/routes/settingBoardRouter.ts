import 'reflect-metadata';
import { Router } from "express";
import { container } from "tsyringe";
import { authenticate } from '../middlewares/authMiddleware';
import { SettingBoardController } from '../controllers/settingBoardController';

const settingWorkspaceRouter = Router();
const settingBoardController = container.resolve(SettingBoardController);

settingWorkspaceRouter.get(
    '/getsettingboard/:idBoard',
    authenticate,
    settingBoardController.getSettingBoardById.bind(settingBoardController)
);

settingWorkspaceRouter.post(
    '/updatesettingboard/:idBoard',
    authenticate,
    settingBoardController.updateSettingBoard.bind(settingBoardController)
);

export default settingWorkspaceRouter;