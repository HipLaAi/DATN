export interface MessageModel {
    message_id?: number;
    conversation_id: number;
    sender_id: number;
    message: string;
    created_at?: Date;
    update_at?: Date
}