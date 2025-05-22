import { injectable } from "tsyringe";
import { Request, Response } from 'express';
import { ChatService } from "../services/chatService";

@injectable()
export class ChatController {
    constructor(private chatService: ChatService) { }

    async getChatResponse(req: Request, res: Response): Promise<any> {
        try {
            const requestContent = req.body.request;
            const optionContent = req.body.option;
            const user = (req as any).user;
            if (!requestContent) {
                return res.status(400).json({ message: "Missing 'request' in payload", results: false });
            }
            const results = await this.chatService.getChatResponse(requestContent, optionContent, user);
            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

}