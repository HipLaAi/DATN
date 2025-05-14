import Joi from "joi";

export const settingCardSchema = Joi.object({
    settingcard_id: Joi.number().optional(),
    card_id: Joi.number().optional(),
    action: Joi.any().optional(),
    permission: Joi.any().optional(),
})
