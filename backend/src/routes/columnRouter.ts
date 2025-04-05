import 'reflect-metadata';
import { Router } from "express";
import { container } from "tsyringe";
import { authenticate } from '../middlewares/authMiddleware';
import { ColumnController } from '../controllers/columnController';

const columnRouter = Router();
const columnController = container.resolve(ColumnController);

columnRouter.post(
    '/create',
    authenticate,
    columnController.createColumn.bind(columnController)
);

columnRouter.post(
    '/updateinformation/:id',
    authenticate,
    columnController.updateInformationColumn.bind(columnController)
);

columnRouter.post(
    '/updatewhenmovecard',
    authenticate,
    columnController.updateColumnWhenMoveCard.bind(columnController)
);

columnRouter.delete(
    '/delete/:id',
    authenticate,
    columnController.deleteColumn.bind(columnController)
);

columnRouter.get(
    '/getallbyboardid/:id',
    authenticate,
    columnController.getAllColumnByBoardID.bind(columnController)
);

export default columnRouter;