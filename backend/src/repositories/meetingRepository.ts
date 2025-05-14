import { injectable } from 'tsyringe';
import { google, calendar_v3 } from 'googleapis';
import "../config/container"

@injectable()
export class MeetingRepository {
    constructor(private calendar: calendar_v3.Calendar) {}

    async createMeeting(calendarId: string, event: calendar_v3.Schema$Event): Promise<any> {
        try {
            const response = await this.calendar.events.insert({
                calendarId,
                requestBody: event,
                conferenceDataVersion: 1,
            });

            return response.data;
        } catch (error: any) {
            console.error('Error creating Google Meet event:', error);
            throw new Error('Unable to create Google Meet event');
        }
    }
}
