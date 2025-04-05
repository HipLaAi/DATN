import Joi from "joi";

export const columnSchema = Joi.object({
    name: Joi.string().pattern(/^[\p{L}\p{N} ]*$/u).optional(),
    status: Joi.string().optional(),
    background: Joi.any().optional(),
    column_id: Joi.number().optional(),
    board_id: Joi.number().optional(),
    card_id_order: Joi.any().optional(),

    card_id: Joi.number().optional(),
    card_id_order_new: Joi.any().optional(),
    card_id_order_old: Joi.any().optional(),
});