import { injectable } from "tsyringe";
import { Request, Response } from 'express';
import { MessageService } from "../services/messageService";
import { messageSchema } from "../schemas/messageSchema";


@injectable()
export class MessageController {
    constructor(private messageService: MessageService) { }

    async createMessage(req: Request, res: Response): Promise<any> {
        const { error, value } = messageSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            await this.messageService.createMessage(value);
            return res.status(200).json({ message: 'Success', results: true });
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async getMessageByConversationID(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            const results = await this.messageService.getMessageByConversationID(id);
            if (results) {
                res.status(200).json(results);
            } else {
                res.json([]);
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}