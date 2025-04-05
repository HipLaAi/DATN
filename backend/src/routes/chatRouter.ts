import 'reflect-metadata';
import { Router } from "express";
import { container } from "tsyringe";
import { authenticate } from '../middlewares/authMiddleware';
import { ChatController } from '../controllers/chatController';

const chatRouter = Router();
const chatController = container.resolve(ChatController);

chatRouter.post(
    '/ai',
    // authenticate,
    chatController.getChatResponse.bind(chatController)
);

export default chatRouter;