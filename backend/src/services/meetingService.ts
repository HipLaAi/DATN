import { injectable } from "tsyringe";
import { MeetingRepository } from "../repositories/meetingRepository";
import { MeetingModel } from "../models/meetingModel";

@injectable()
export class MeetingService {
    constructor(private meetingRepository: MeetingRepository) { };

    async createMeeting(meeting: MeetingModel): Promise<any> {
        const calendarId = 'primary'; // ID lịch chính của người dùng

        const event: any = {
            summary: meeting.summary,
            description: meeting.description,
            start: { dateTime: meeting.start },
            end: { dateTime: meeting.end },
            attendees: meeting.attendees,
            conferenceData: {
                createRequest: {
                    requestId: `meet-${Date.now()}`, // Đảm bảo ID yêu cầu là duy nhất
                    conferenceSolutionKey: { type: 'hangoutsMeet' },
                },
            },
        };

        return this.meetingRepository.createMeeting(calendarId, event);
    }
}
