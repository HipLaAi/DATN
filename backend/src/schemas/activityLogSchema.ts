import Joi from "joi";

export const activityLogSchema = Joi.object({
    activitycard_id: Joi.number().optional(),
    card_id: Joi.number().optional(),
    user_id: Joi.number().optional(),
    description: Joi.any().optional(),

    activityuser_id: Joi.number().optional(),
    action: Joi.any().optional(),
    ip_address: Joi.any().optional(),
    device: Joi.any().optional(),
    browser: Joi.any().optional(),
    url: Joi.any().optional(),
    status: Joi.any().optional(),
})
