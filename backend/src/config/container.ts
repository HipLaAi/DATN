import { container } from 'tsyringe';
import { google, calendar_v3 } from 'googleapis';

// Khởi tạo Google Calendar API
const calendar = google.calendar({ version: 'v3' });

// Đăng ký instance của Google Calendar API vào container
container.registerInstance<calendar_v3.Calendar>(calendar_v3.Calendar, calendar);
