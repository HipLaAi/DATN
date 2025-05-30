import Joi from "joi";

export const cardSchema = Joi.object({
    name: Joi.any().optional(),
    status: Joi.string().optional(),
    files: Joi.any().optional(),
    column_id: Joi.number().optional(),
    card_id: Joi.number().optional(),
    user_id_join: Joi.any().optional(),
    description: Joi.any().optional(),
    start_date: Joi.any().optional(),
    end_date: Joi.any().optional(),
    timer: Joi.any().optional(),
    user_id: Joi.number().optional(),
});