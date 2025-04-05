import 'reflect-metadata';
import { Router } from "express";
import { container } from "tsyringe";
import { UploadMiddleware } from '../middlewares/uploadMiddleware';
import { authenticate } from '../middlewares/authMiddleware';
import { BoardController } from '../controllers/boardController';

const boardRouter = Router();
const boardController = container.resolve(BoardController);
const uploadMiddleware = container.resolve(UploadMiddleware);

boardRouter.post(
    '/create', uploadMiddleware.Upload,
    authenticate,
    boardController.createBoard.bind(boardController)
);

boardRouter.post(
    '/updateinformation/:id', uploadMiddleware.Upload,
    authenticate,
    boardController.updateIBoard.bind(boardController)
);

boardRouter.post(
    '/updatewhenmovecolumn',
    authenticate,
    boardController.updateBoardWhenMoveColumn.bind(boardController)
);

boardRouter.get(
    '/getbyid/:id',
    authenticate,
    boardController.getBoardById.bind(boardController)
);

boardRouter.delete(
    '/delete/:id',
    authenticate,
    boardController.deleteBoard.bind(boardController)
);


boardRouter.post(
    '/createguest',
    authenticate,
    boardController.createGuest.bind(boardController)
);

boardRouter.post(
    '/getboardbycustom/:id',
    authenticate,
    boardController.getBoardByCustom.bind(boardController)
);

boardRouter.post(
    '/deleteguest/:id',
    authenticate,
    boardController.deleteGuest.bind(boardController)
);

export default boardRouter;