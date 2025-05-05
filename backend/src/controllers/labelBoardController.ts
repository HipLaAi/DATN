import { injectable } from "tsyringe";
import { Request, Response } from 'express';
import { LabelBoardService } from "../services/labelBoardService";
import { labelBoardSchema } from "../schemas/labelBoardSchema";

@injectable()
export class LabelBoardController {
    constructor(private labelBoardService: LabelBoardService) { }

    async getLabelBoardById(req: Request, res: Response): Promise<any> {
        try {
            const board_id = parseInt(req.params.idBoard);

            const results = await this.labelBoardService.getLabelBoardById({
                board_id: board_id,
            });
            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async createLabelBoard(req: Request, res: Response): Promise<any> {
        const { error, value } = labelBoardSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const board_id = parseInt(req.params.idBoard);

            const updateData = {
                ...value,
                board_id: board_id,
            };

            await this.labelBoardService.createLabelBoard(updateData);

            return res.status(200).json({ message: 'Success', results: true });
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async updateLabelBoard(req: Request, res: Response): Promise<any> {
        const { error, value } = labelBoardSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const board_id = parseInt(req.params.idBoard);

            const updateData = {
                ...value,
                board_id: board_id,
            };

            await this.labelBoardService.updateLabelBoard(updateData);

            return res.status(200).json({ message: 'Success', results: true });
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async deleteLabelBoard(req: Request, res: Response): Promise<any> {
        try {
            const labelboard_id = parseInt(req.params.idLabelBoard);

            const results = await this.labelBoardService.deleteLabelBoard({
                labelboard_id: labelboard_id,
            });
            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async createLabel(req: Request, res: Response): Promise<any> {
        const { error, value } = labelBoardSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {

            const results = await this.labelBoardService.createLabel(value);

            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async deleteLabel(req: Request, res: Response): Promise<any> {
        try {
            const label_id = parseInt(req.params.idLabel);

            const results = await this.labelBoardService.deleteLabel({
                label_id: label_id
            });
            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }
}