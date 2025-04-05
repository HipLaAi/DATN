import { injectable } from "tsyringe";
import { ChatReponsitory } from "../repositories/chatRepository";

@injectable()
export class ChatService {
    constructor(private chatReponsitory: ChatReponsitory) {};

    async getChatResponse(repuest: string): Promise<any> {
        return this.chatReponsitory.getChatResponse(repuest);
    }
}