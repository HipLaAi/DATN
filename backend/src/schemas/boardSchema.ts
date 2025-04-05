import Joi from "joi";

export const boardSchema = Joi.object({
    name: Joi.string().pattern(/^[\p{L}\p{N} ]*$/u).optional(),
    description: Joi.any().optional(),
    status: Joi.string().optional(),
    background: Joi.string().optional(),
    workspace_id: Joi.number().optional(),
    board_id: Joi.number().optional(),
    column_id_order: Joi.any().optional(),
    user_id: Joi.any().optional(),
})
