import 'reflect-metadata';
import { Router } from "express";
import { container } from "tsyringe";
import { WorkspaceController } from '../controllers/workspaceController';
import { UploadMiddleware } from '../middlewares/uploadMiddleware';
import { authenticate } from '../middlewares/authMiddleware';

const workspaceRouter = Router();
const workspaceController = container.resolve(WorkspaceController);
const uploadMiddleware = container.resolve(UploadMiddleware);

workspaceRouter.post(
    '/create', uploadMiddleware.Upload,
    authenticate,
    workspaceController.createWorkspace.bind(workspaceController)
);

workspaceRouter.post(
    '/update/:id', uploadMiddleware.Upload,
    authenticate,
    workspaceController.updateWorkspace.bind(workspaceController)
);

workspaceRouter.get(
    '/getbyid/:id',
    authenticate,
    workspaceController.getWorkspaceById.bind(workspaceController)
);

workspaceRouter.delete(
    '/delete/:id',
    authenticate,
    workspaceController.deleteWorkspace.bind(workspaceController)
);

workspaceRouter.post(
    '/createmember',
    authenticate,
    workspaceController.createMember.bind(workspaceController)
);

workspaceRouter.get(
    '/getallbyuseridmember',
    authenticate,
    workspaceController.getAllWorkspaceByUserIdMember.bind(workspaceController)
);

workspaceRouter.get(
    '/getallbyuseridguest',
    authenticate,
    workspaceController.getAllWorkspaceByUserIdGuest.bind(workspaceController)
);

workspaceRouter.get(
    '/getmemberbyworkspaceid/:id',
    authenticate,
    workspaceController.getMemberByWorkspaceID.bind(workspaceController)
);

workspaceRouter.get(
    '/getguestbyworkspaceid/:id',
    authenticate,
    workspaceController.getGuestByWorkspaceID.bind(workspaceController)
);

workspaceRouter.post(
    '/deletemember/:id',
    authenticate,
    workspaceController.deleteMember.bind(workspaceController)
);

export default workspaceRouter;