import 'reflect-metadata';
import { Router } from 'express';
import userRouter from "./userRouter";
import workspaceRouter from './workspaceRouter';
import boardRouter from './boardRouter';
import columnRouter from './columnRouter';
import cardRouter from './cardRouter';
import conversationRouter from './conversationRouter';
import messageRouter from './messageRouter';

import fileRouter from './fileRouter';
import checkListRouter from './checkListRouter';
import chatRouter from './chatRouter';
import settingWorkspaceRouter from './settingWorkspaceRouter';
import settingBoardRouter from './settingBoardRouter';
import labelBoardRouter from './labelBoardRouter';

const router = Router();
router.use('', userRouter);
router.use('/workspace', workspaceRouter);
router.use('/board', boardRouter);
router.use('/column', columnRouter);
router.use('/card', cardRouter);
router.use('/conversation', conversationRouter);
router.use('/message', messageRouter);

router.use('/file', fileRouter);
router.use('/checklist', checkListRouter);

router.use('/chat', chatRouter);

router.use('/settingworkspace', settingWorkspaceRouter);

router.use('/settingboard', settingBoardRouter);

router.use('/labelboard', labelBoardRouter);


export default router;