import Joi from "joi";

export const activityLogSchema = Joi.object({
    activitycard_id: Joi.number().optional(),
    card_id: Joi.number().optional(),
    user_id: Joi.number().optional(),
    description: Joi.any().optional(),
})
