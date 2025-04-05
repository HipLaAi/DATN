import 'reflect-metadata';
import { Router } from "express";
import { container } from "tsyringe";
import { authenticate } from '../middlewares/authMiddleware';
import { MessageController } from '../controllers/messageController';

const messageRouter = Router();
const messageController = container.resolve(MessageController);

messageRouter.post(
    '/create',
    authenticate,
    messageController.createMessage.bind(messageController)
);

messageRouter.get(
    '/getmessagebyconversationid/:id',
    authenticate,
    messageController.getMessageByConversationID.bind(messageController)
);

export default messageRouter;