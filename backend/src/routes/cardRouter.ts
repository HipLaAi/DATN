import 'reflect-metadata';
import { Router } from "express";
import { container } from "tsyringe";
import { UploadMiddleware } from '../middlewares/uploadMiddleware';
import { authenticate } from '../middlewares/authMiddleware';
import { CardController } from '../controllers/cardController';

const cardRouter = Router();
const cardController = container.resolve(CardController);
const uploadMiddleware = container.resolve(UploadMiddleware);

cardRouter.post(
    '/create',
    authenticate,
    cardController.createCard.bind(cardController)
);

cardRouter.post(
    '/updateinformation/:id',
    authenticate,
    cardController.updateInformationCard.bind(cardController)
);

cardRouter.get(
    '/getbyid/:id',
    authenticate,
    cardController.getCardByID.bind(cardController)
);

cardRouter.delete(
    '/delete/:id',
    authenticate,
    cardController.deleteCard.bind(cardController)
);

cardRouter.post(
    '/updateuserjoin/:id',
    authenticate,
    cardController.createUserJoinCard.bind(cardController)
);

cardRouter.post(
    '/updateuserout/:id',
    authenticate,
    cardController.deleteUserJoincard.bind(cardController)
);

cardRouter.get(
    '/getallbyboardid/:id',
    authenticate,
    cardController.getAllCardByBoardID.bind(cardController)
);

cardRouter.post(
    '/updatetime/:id',
    authenticate,
    cardController.updateTimeCard.bind(cardController)
);

cardRouter.post(
    '/updatebycolumnid/:id',
    authenticate,
    cardController.updateCardByColumnID.bind(cardController)
);

cardRouter.get(
    '/getbycolumn/:id',
    authenticate,
    cardController.getCardByColumn.bind(cardController)
);

cardRouter.get(
    '/getbyuser/:id',
    authenticate,
    cardController.getCardByUser.bind(cardController)
);


export default cardRouter;