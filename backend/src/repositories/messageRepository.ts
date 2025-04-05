import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { MessageModel } from "../models/messageModel";

@injectable()
export class MessageReponsitory {
    constructor(private db: Database) { };

    async createMessage(message: MessageModel): Promise<any> {
        try {
            const sql = 'call CreateMessage(?, ?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                message.conversation_id,
                message.sender_id,
                message.message
            ]);
            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getMessageByConversationID(id: string): Promise<any> {
        try {
            const sql = 'call GetMessageByConversationID(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [id]);

            if (Array.isArray(results) && results.length > 0) {
                return results;
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}