import { injectable } from "tsyringe";
import { MessageReponsitory } from "../repositories/messageRepository";
import { MessageModel } from "../models/messageModel";

@injectable()
export class MessageService {
    constructor(private messageReponsitory: MessageReponsitory) {};

    async createMessage(message: MessageModel): Promise<any> {
        return this.messageReponsitory.createMessage(message);
    }

    async getMessageByConversationID(id: string): Promise<any> {
        return this.messageReponsitory.getMessageByConversationID(id);
    }
}