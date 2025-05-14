import 'reflect-metadata';
import { Router } from "express";
import { container } from "tsyringe";
import { authenticate } from '../middlewares/authMiddleware';
import { SettingCardController } from '../controllers/settingCardController';

const settingCardRouter = Router();
const settingCardController = container.resolve(SettingCardController);

settingCardRouter.get(
    '/getsettingcard/:idCard',
    authenticate,
    settingCardController.getSettingCardById.bind(settingCardController)
);

settingCardRouter.post(
    '/updatesettingcard/:idCard',
    authenticate,
    settingCardController.updateSettingCard.bind(settingCardController)
);

export default settingCardRouter;