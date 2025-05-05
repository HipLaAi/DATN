import { injectable } from "tsyringe";
import { Request, Response } from 'express';
import { SettingBoardService } from "../services/settingBoardService";
import { settingBoardSchema } from "../schemas/settingBoardSchema";

@injectable()
export class SettingBoardController {
    constructor(private settingBoardService: SettingBoardService) { }

    async getSettingBoardById(req: Request, res: Response): Promise<any> {
        try {
            const board_id = parseInt(req.params.idBoard);

            const results = await this.settingBoardService.getSettingBoardById({
                board_id: board_id,
            });
            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async updateSettingBoard(req: Request, res: Response): Promise<any> {
        const { error, value } = settingBoardSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }
        try {
            const board_id = parseInt(req.params.idBoard);

            const updateData = {
                ...value,
                board_id: board_id
            };

            const results = await this.settingBoardService.updateSettingBoard(updateData);
            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }
}