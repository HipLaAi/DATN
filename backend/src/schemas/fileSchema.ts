import Joi from "joi";

export const fileSchema = Joi.object({
    file_id: Joi.number().optional(),
    card_id: Joi.number().optional(),
    user_id: Joi.number().optional(),
    files: Joi.any().optional(),
});