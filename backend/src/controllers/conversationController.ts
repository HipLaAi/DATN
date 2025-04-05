import { injectable } from "tsyringe";
import { Request, Response } from 'express';
import { conversationSchema } from "../schemas/conversationSchema";
import { ConversationService } from "../services/conversationService";


@injectable()
export class ConversationController {
    constructor(private conversationService: ConversationService) { }

    async createConversation(req: Request, res: Response): Promise<any> {
        const { error, value } = conversationSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const results = await this.conversationService.createConversation(value);
            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async getConversationByUserID(req: Request, res: Response): Promise<any> {
        try {
            const user = (req as any).user;
            const results = await this.conversationService.getConversationByUserID(user.user_id);
            if (results) {
                res.status(200).json(results);
            } else {
                res.json({ message: 'Not exists' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}