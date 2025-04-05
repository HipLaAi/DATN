import 'reflect-metadata';
import { Router } from "express";
import { container } from "tsyringe";
import { authenticate } from '../middlewares/authMiddleware';
import { CheckListController } from '../controllers/checkListController';

const checkListRouter = Router();
const checkListController = container.resolve(CheckListController);

checkListRouter.post(
    '/createname',
    authenticate,
    checkListController.createCheckListName.bind(checkListController)
);

checkListRouter.post(
    '/updatename/:id',
    authenticate,
    checkListController.updateCheckListName.bind(checkListController)
);

checkListRouter.delete(
    '/deletename/:id',
    authenticate,
    checkListController.deleteCheckListName.bind(checkListController)
);

checkListRouter.post(
    '/create',
    authenticate,
    checkListController.createCheckList.bind(checkListController)
);

checkListRouter.post(
    '/update/:id',
    authenticate,
    checkListController.updateCheckList.bind(checkListController)
);

checkListRouter.delete(
    '/delete/:id',
    authenticate,
    checkListController.deleteCheckList.bind(checkListController)
);

export default checkListRouter;