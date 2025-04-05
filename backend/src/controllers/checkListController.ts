import { injectable } from "tsyringe";
import { Request, Response } from 'express';
import { CheckListService } from "../services/checkListService";
import { checkListSchema } from "../schemas/checkListSchema";

@injectable()
export class CheckListController {
    constructor(private checkListService: CheckListService) { }

    async createCheckListName(req: Request, res: Response): Promise<any> {
        const { error, value } = checkListSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const results = await this.checkListService.createCheckListName(value);
            return  res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async updateCheckListName(req: Request, res: Response): Promise<any> {
        const { error, value } = checkListSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const id = req.params.id;
            await this.checkListService.updateCheckListName({
                ...value,
                checklistname_id: id,
            });

            return res.status(200).json({ message: 'Success', results: true });

        } catch (error: any) {
            return res.status(500).json({ message: error.message, results: false });
        }
    }

    async deleteCheckListName(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            await this.checkListService.deleteCheckListName(id);
            return res.status(200).json({ message: 'Success', results: true });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async createCheckList(req: Request, res: Response): Promise<any> {
        const { error, value } = checkListSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const results = await this.checkListService.createCheckList(value);
            return  res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async updateCheckList(req: Request, res: Response): Promise<any> {
        const { error, value } = checkListSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const id = req.params.id;
            const results = await this.checkListService.updateCheckList({
                ...value,
                checklist_id: id,
            });

            return res.status(200).json(results);

        } catch (error: any) {
            return res.status(500).json({ message: error.message, results: false });
        }
    }

    async deleteCheckList(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            await this.checkListService.deleteCheckList(id);
            return res.status(200).json({ message: 'Success', results: true });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}