import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { ConversationModel } from "../models/conversationModel";

@injectable()
export class ConversationReponsitory {
    constructor(private db: Database) { };

    async createConversation(conversation: ConversationModel): Promise<any> {
        try {
            const sql = 'call CreateConversation(?, ?, @err_code, @err_msg)';
            const [results]  = await this.db.query(sql, [
                conversation.user_id_1,
                conversation.user_id_2
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getConversationByUserID(id: string): Promise<any> {
        try {
            const sql = 'call GetConversationByUserID(?, @err_code, @err_msg)';
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