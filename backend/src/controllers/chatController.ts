import { injectable } from "tsyringe";
import { Request, Response } from 'express';
import { ChatService } from "../services/chatService";

@injectable()
export class ChatController {
    constructor(private chatService: ChatService) { }

    async getChatResponse(req: Request, res: Response): Promise<any> {
        try {
            // Lấy giá trị từ key "request"
            const requestContent = req.body.request;
            if (!requestContent) {
                return res.status(400).json({ message: "Missing 'request' in payload", results: false });
            }
            const results = await this.chatService.getChatResponse(requestContent);
            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

}