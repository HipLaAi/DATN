export interface NotificationModel {
    notification_id?: number,
    user_id?: number,
    card_id?: number,
    checklist_id?: number,
    message?: string,
    is_sent?: boolean,
    is_read?: boolean,
    notify_time?: Date,
}