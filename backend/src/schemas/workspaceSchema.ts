import Joi from "joi";

export const workspaceSchema = Joi.object({
    name: Joi.string().pattern(/^[\p{L}\p{N} ]*$/u).optional(),
    description: Joi.string().pattern(/^[\p{L}\p{N} ]*$/u).optional(),
    status: Joi.string().pattern(/^[\p{L}\p{N} ]*$/u).optional(),
    files: Joi.any().optional(),
    workspace_id: Joi.number().optional(),
    user_id: Joi.number().optional(),
});