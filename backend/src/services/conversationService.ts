import { injectable } from "tsyringe";
import { ConversationReponsitory } from "../repositories/conversationRepository";
import { ConversationModel } from "../models/conversationModel";

@injectable()
export class ConversationService {
    constructor(private conversationReponsitory: ConversationReponsitory) {};

    async createConversation(conversation: ConversationModel): Promise<any> {
        return this.conversationReponsitory.createConversation(conversation);
    }

    async getConversationByUserID(id: string): Promise<any> {
        return this.conversationReponsitory.getConversationByUserID(id);
    }
}