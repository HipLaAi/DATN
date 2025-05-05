import 'reflect-metadata';
import { Router } from "express";
import { container } from "tsyringe";
import { authenticate } from '../middlewares/authMiddleware';
import { LabelBoardController } from '../controllers/labelBoardController';

const labelBoardRouter = Router();
const labelBoardController = container.resolve(LabelBoardController);

labelBoardRouter.get(
    '/getlabelboard/:idBoard',
    authenticate,
    labelBoardController.getLabelBoardById.bind(labelBoardController)
);

labelBoardRouter.post(
    '/createlabelboard/:idBoard',
    authenticate,
    labelBoardController.createLabelBoard.bind(labelBoardController)
);

labelBoardRouter.post(
    '/updatelabelboard/:idBoard',
    authenticate,
    labelBoardController.updateLabelBoard.bind(labelBoardController)
);

labelBoardRouter.delete(
    '/deletelabelboard/:idLabelBoard',
    authenticate,
    labelBoardController.deleteLabelBoard.bind(labelBoardController)
);

labelBoardRouter.post(
    '/createlabel',
    authenticate,
    labelBoardController.createLabel.bind(labelBoardController)
);

labelBoardRouter.delete(
    '/deletelabel/:idLabel',
    authenticate,
    labelBoardController.deleteLabel.bind(labelBoardController)
);



export default labelBoardRouter;