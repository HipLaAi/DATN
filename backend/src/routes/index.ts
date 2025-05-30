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
import settingCardRouter from './settingCardRouter';
import commentRouter from './commentRouter';
import activityLogRouter from './activityLogRouter';
import meetingRouter from './meetingRouter';
import notificationRouter from './notificationRouter';

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
router.use('/settingcard', settingCardRouter);
router.use('/labelboard', labelBoardRouter);
router.use('/comment', commentRouter);
router.use('/activitylog', activityLogRouter);
router.use('/meeting', meetingRouter);
router.use('/notification', notificationRouter);


export default router;