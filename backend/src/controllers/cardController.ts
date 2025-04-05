import { injectable } from "tsyringe";
import { Request, Response } from 'express';
import { UploadMiddleware } from '../middlewares/uploadMiddleware';
import { container } from "tsyringe";
import { CardService } from "../services/cardService";
import { cardSchema } from "../schemas/cardSchema";

const uploadMiddleware = container.resolve(UploadMiddleware);

@injectable()
export class CardController {
    constructor(private cardService: CardService) { }

    async createCard(req: Request, res: Response): Promise<any> {
        const { error, value } = cardSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {

            const results = await this.cardService.createCard(value);
            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async updateInformationCard(req: Request, res: Response): Promise<any> {
        const { error, value } = cardSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const id = req.params.id;

            await this.cardService.updateInformationCard({
                ...value,
                card_id: id,
            });

            return res.status(200).json({ message: 'Success', results: true });
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async getCardByID(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            const results = await this.cardService.getCardByID(id);
            if (results) {
                res.status(200).json(results);
            } else {
                res.json({ message: 'Not exists' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteCard(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            const oldFilePath = await this.cardService.deleteCard(id);
            uploadMiddleware.Remove(oldFilePath.old_path);
            return res.status(200).json({ message: 'Success', success: true });
        } catch (error: any) {
            return res.status(500).json({ message: error.message, success: false });
        }
    }

    async createUserJoinCard(req: Request, res: Response): Promise<any> {
        const { error, value } = cardSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const id = parseInt(req.params.id, 10);
            const results = await this.cardService.createUserJoinCard({
                ... value,
                card_id: id
            });
            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteUserJoincard(req: Request, res: Response): Promise<any> {
        const { error, value } = cardSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const id = parseInt(req.params.id, 10);
            await this.cardService.deleteUserJoincard({
                ...value,
                card_id: id
            });
            return res.status(200).json(req.body);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllCardByBoardID(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            const results = await this.cardService.getAllCardByBoardID(id);
            if (results) {
                res.status(200).json(results);
            } else {
                res.json([]);
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateTimeCard(req: Request, res: Response): Promise<any> {
        const { error, value } = cardSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const id = req.params.id;

            await this.cardService.updateTimeCard({
                ...value,
                card_id: id,
            });

            return res.status(200).json({ message: 'Success', results: true });
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async updateCardByColumnID(req: Request, res: Response): Promise<any> {
        const { error, value } = cardSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const id = req.params.id;

            await this.cardService.updateCardByColumnID({
                ...value,
                card_id: id,
            });

            return res.status(200).json({ message: 'Success', results: true });
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async getCardByColumn(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            const results = await this.cardService.getCardByColumn(id);
            if (results) {
                res.status(200).json(results);
            } else {
                res.json({ message: 'Not exists' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getCardByUser(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            const results = await this.cardService.getCardByUser(id);
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