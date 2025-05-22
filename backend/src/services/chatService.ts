import { injectable } from "tsyringe";
import { ChatReponsitory } from "../repositories/chatRepository";

@injectable()
export class ChatService {
    constructor(private chatReponsitory: ChatReponsitory) {};

    async getChatResponse(repuest: string, option: any, user: any): Promise<any> {
        return this.chatReponsitory.getChatResponse(repuest, option, user);
    }
}