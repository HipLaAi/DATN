import { google } from 'googleapis';
import { Request, Response } from 'express';
import { config } from "../config/config";
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
    config.google.clientId,
    config.google.clientSecret,
    "http://localhost:4040/api/meeting/callback"
);

export const getAuthUrl = (req: Request, res: Response) => {
    const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];
    try {
        const authUrl = client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        res.json({ url: authUrl });
    } catch (error) {
        console.error("Error generating auth URL:", error);
        res.status(500).json({ error: 'Failed to generate auth URL', details: error });
    }

};

// Hàm xử lý đổi mã `code` lấy `access token`
export const getAccessToken = async (req: Request, res: Response) => {
    const { code } = req.query;
    if (code) {
        try {
            const { tokens } = await client.getToken(code as string);
            client.setCredentials(tokens);
            res.send('<script>window.opener.postMessage({ authenticated: true }, "http://localhost:5173/videocall"); window.close();</script>');
        } catch (error) {
            console.error('Error getting tokens:', error);
            res.status(500).send('Authentication failed');
        }
    } else {
        res.status(400).send('Missing code');
    }
};

// Hàm tạo sự kiện Google Meet
export const createGoogleMeetEvent = async (req: Request, res: Response) => {
    const { summary, startTime, endTime } = req.body;
    try {
        const calendar = google.calendar({ version: 'v3', auth: client });

        const event = {
            summary,
            start: { dateTime: new Date(startTime).toISOString(), timeZone: 'Asia/Ho_Chi_Minh' },
            end: { dateTime: new Date(endTime).toISOString(), timeZone: 'Asia/Ho_Chi_Minh' },
            conferenceData: {
                createRequest: {
                    requestId: new Date().toISOString(),
                    conferenceSolutionKey: { type: 'hangoutsMeet' },
                },
            },
            attendees: [
                { email: 'vuminhhieu21122003@gmail.com' },
                { email: 'vuvanhiep05092003@gmail.com' },
            ],
        };


        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
            conferenceDataVersion: 1,
        });

        res.json({ meetLink: response.data.hangoutLink });
    } catch (error: any) {
        console.error('Error creating Google Meet event:', error);
        res.status(500).json({
            error: 'Failed to create Google Meet event',
            details: error.response?.data || error.message,
        });
    }
};