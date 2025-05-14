export interface MeetingModel {
    summary?: string; // Tiêu đề sự kiện
    description?: string; // Mô tả sự kiện
    start?: Date; // Ngày và giờ bắt đầu
    end?: Date; // Ngày và giờ kết thúc
    attendees?: Array<{ email: string }>; // Danh sách email người tham gia
    conferenceData?: {
        createRequest: {
            requestId: string; // ID yêu cầu tạo Google Meet
            conferenceSolutionKey: { type: 'hangoutsMeet' }; // Loại Meet
        };
    };
}
