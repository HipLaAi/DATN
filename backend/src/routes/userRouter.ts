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
    '/register',
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


userRouter.get(
    '/getusergrowthrate/:month',
    authenticate,
    userController.getUserGrowthRate.bind(userController)
);

userRouter.get(
    '/getnewuser/:month',
    authenticate,
    userController.getNewUser.bind(userController)
);

userRouter.get(
    '/getactivityuser',
    authenticate,
    userController.getActivityUser.bind(userController)
);

userRouter.get(
    '/getalluser',
    authenticate,
    userController.getAllUser.bind(userController)
);

userRouter.get(
    '/getactivityuserbyrange/:range',
    authenticate,
    userController.getActivityUserByRange.bind(userController)
);

userRouter.post(
    '/sendverificationemail',
    userController.sendVerificationEmail.bind(userController)
);

userRouter.post(
    '/logout',
    userController.logout.bind(userController)
);
export default userRouter;