import 'reflect-metadata';
import { Router } from "express";
import { container } from "tsyringe";
import { UploadMiddleware } from '../middlewares/uploadMiddleware';
import { authenticate } from '../middlewares/authMiddleware';
import { FileController } from '../controllers/fileController';

const fileRouter = Router();
const fileController = container.resolve(FileController);
const uploadMiddleware = container.resolve(UploadMiddleware);

fileRouter.post(
    '/create', uploadMiddleware.Upload,
    authenticate,
    fileController.createFile.bind(fileController)
);

fileRouter.delete(
    '/delete/:id',
    authenticate,
    fileController.deleteFile.bind(fileController)
);

export default fileRouter;