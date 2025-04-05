import 'reflect-metadata';
import { Router } from "express";
import { container } from "tsyringe";
import { authenticate } from '../middlewares/authMiddleware';
import { ConversationController } from '../controllers/conversationController';

const conversationRouter = Router();
const conversationController = container.resolve(ConversationController);

conversationRouter.post(
    '/create',
    authenticate,
    conversationController.createConversation.bind(conversationController)
);

conversationRouter.get(
    '/getconversationbyuserid',
    authenticate,
    conversationController.getConversationByUserID.bind(conversationController)
);

export default conversationRouter;