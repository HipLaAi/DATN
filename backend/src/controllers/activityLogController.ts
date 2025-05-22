import { injectable } from "tsyringe";
import { Request, Response } from 'express';
import { ActivityLogService } from "../services/activityLogService";
import { activityLogSchema } from "../schemas/activityLogSchema";

@injectable()
export class ActivityLogController {
    constructor(private activityLogService: ActivityLogService) { }

    async createActivityCard(req: Request, res: Response): Promise<any> {
        const { error, value } = activityLogSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {

            const results = await this.activityLogService.createActivityCard(value);

            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async getActivityCard(req: Request, res: Response): Promise<any> {
        try {
            const card_id = parseInt(req.params.idCard);

            const results = await this.activityLogService.getActivityCard({
                card_id: card_id,
            });
            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async createActivityUser(req: Request, res: Response): Promise<any> {
        const { error, value } = activityLogSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {

            const results = await this.activityLogService.createActivityUser(value);

            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }
}