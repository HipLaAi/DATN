import 'reflect-metadata';
import { Router } from "express";
import { container } from "tsyringe";
import { authenticate } from '../middlewares/authMiddleware';
import { CommentController } from '../controllers/commentController';

const commentRouter = Router();
const commentController = container.resolve(CommentController);

commentRouter.post(
    '/create',
    authenticate,
    commentController.createComment.bind(commentController)
);

commentRouter.post(
    '/update/:idComment',
    authenticate,
    commentController.updateComment.bind(commentController)
);

commentRouter.delete(
    '/delete/:idComment',
    authenticate,
    commentController.deleteComment.bind(commentController)
);

export default commentRouter;