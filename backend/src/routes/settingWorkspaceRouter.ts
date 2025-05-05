import 'reflect-metadata';
import { Router } from "express";
import { container } from "tsyringe";
import { authenticate } from '../middlewares/authMiddleware';
import { SettingWorkspaceController } from '../controllers/settingWorkspaceController';

const settingWorkspaceRouter = Router();
const settingWorkspaceController = container.resolve(SettingWorkspaceController);

settingWorkspaceRouter.get(
    '/getsettingworkspace/:idWorkspace',
    authenticate,
    settingWorkspaceController.getSettingWorkspaceById.bind(settingWorkspaceController)
);

settingWorkspaceRouter.post(
    '/updatesettingworkspace/:idWorkspace',
    authenticate,
    settingWorkspaceController.updateSettingWorkspace.bind(settingWorkspaceController)
);

export default settingWorkspaceRouter;