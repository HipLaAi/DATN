import Joi from "joi";

export const commentSchema = Joi.object({
    comment_id: Joi.number().optional(),
    card_id: Joi.number().optional(),
    user_id: Joi.number().optional(),
    comment: Joi.any().optional(),
})
