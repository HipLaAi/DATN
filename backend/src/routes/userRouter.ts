import 'reflect-metadata';
import { Router } from "express";
import { container } from "tsyringe";
import { UserController } from "../controllers/userController";
import { UploadMiddleware } from '../middlewares/uploadMiddleware';
import { authenticate } from '../middlewares/authMiddleware';

const userRouter = Router();
const userController = container.resolve(UserController);
const uploadMiddleware = container.resolve(UploadMiddleware);

userRouter.post(
    '/register', uploadMiddleware.Upload,
    userController.register.bind(userController)
);

userRouter.post(
    '/login',
    userController.login.bind(userController)
);

userRouter.post(
    '/googlelogin',
    userController.googleLogin.bind(userController)
);

userRouter.post(
    '/refreshtoken',
    userController.refreshToken.bind(userController)
);

userRouter.post(
    '/search',
    authenticate,
    userController.search.bind(userController)
);

export default userRouter;