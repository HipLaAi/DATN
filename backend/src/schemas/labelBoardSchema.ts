import Joi from "joi";

export const labelBoardSchema = Joi.object({
    labelboard_id: Joi.number().optional(),
    board_id: Joi.number().optional(),
    name: Joi.any().optional(),
    background: Joi.any().optional(),
    label_id: Joi.number().optional(),
    card_id: Joi.number().optional()
})
