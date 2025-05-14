import { injectable } from "tsyringe";
import { Request, Response } from 'express';
import { SettingCardService } from "../services/settingCardService";
import { settingCardSchema } from "../schemas/settingCardSchema";

@injectable()
export class SettingCardController {
    constructor(private settingCardService: SettingCardService) { }

    async getSettingCardById(req: Request, res: Response): Promise<any> {
        try {
            const card_id = parseInt(req.params.idCard);

            const results = await this.settingCardService.getSettingCardById({
                card_id: card_id,
            });
            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async updateSettingCard(req: Request, res: Response): Promise<any> {
        const { error, value } = settingCardSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }
        try {
            const card_id = parseInt(req.params.idCard);

            const updateData = {
                ...value,
                card_id: card_id
            };

            const results = await this.settingCardService.updateSettingCard(updateData);
            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }
}