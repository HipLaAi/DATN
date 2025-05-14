import express from 'express';
import { getAuthUrl, getAccessToken, createGoogleMeetEvent } from '../controllers/meetingController';

const meetingRouter = express.Router();

meetingRouter.get('/auth-url', getAuthUrl);
meetingRouter.get('/callback', getAccessToken);
meetingRouter.post('/create-meet', createGoogleMeetEvent);

export default meetingRouter;
