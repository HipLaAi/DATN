export interface ActivityLogModel {
    activitycard_id?: number;
    card_id?: number;
    description?: string;

    user_id?: number;
    created_at?: Date;

    activityuser_id?: number;
    action?: string;
    ip_address?: string;
    device?: string;
    browser?: string;
    url?: string;
    status?: string;
}