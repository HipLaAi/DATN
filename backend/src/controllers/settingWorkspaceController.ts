import { injectable } from "tsyringe";
import { Request, Response } from 'express';
import { SettingWorkspaceService } from "../services/settingWorkspaceService";
import { settingWorkspaceSchema } from "../schemas/settingWorkspaceSchema";

@injectable()
export class SettingWorkspaceController {
    constructor(private settingWorkspaceService: SettingWorkspaceService) { }

    async getSettingWorkspaceById(req: Request, res: Response): Promise<any> {
        try {
            const workspace_id = parseInt(req.params.idWorkspace);

            const results = await this.settingWorkspaceService.getSettingWorkspaceById({
                workspace_id: workspace_id,
            });
            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async updateSettingWorkspace(req: Request, res: Response): Promise<any> {
        const { error, value } = settingWorkspaceSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }
        try {
            const workspace_id = parseInt(req.params.idWorkspace);

            const updateData = {
                ...value,
                workspace_id: workspace_id
            };

            const results = await this.settingWorkspaceService.updateSettingWorkspace(updateData);
            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }
}