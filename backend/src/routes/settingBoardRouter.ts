import 'reflect-metadata';
import { Router } from "express";
import { container } from "tsyringe";
import { authenticate } from '../middlewares/authMiddleware';
import { SettingBoardController } from '../controllers/settingBoardController';

const settingBoardRouter = Router();
const settingBoardController = container.resolve(SettingBoardController);

settingBoardRouter.get(
    '/getsettingboard/:idBoard',
    authenticate,
    settingBoardController.getSettingBoardById.bind(settingBoardController)
);

settingBoardRouter.post(
    '/updatesettingboard/:idBoard',
    authenticate,
    settingBoardController.updateSettingBoard.bind(settingBoardController)
);

export default settingBoardRouter;