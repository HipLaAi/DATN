import Joi from "joi";

export const settingWorkspaceSchema = Joi.object({
    settingworkspace_id: Joi.number().optional(),
    workspace_id: Joi.number().optional(),
    action: Joi.any().optional(),
    permission: Joi.any().optional(),
})
