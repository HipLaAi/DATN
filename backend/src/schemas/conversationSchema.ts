import Joi from "joi";

export const conversationSchema = Joi.object({
    conversation_id: Joi.number().optional(),
    user_id_1: Joi.number().required(),
    user_id_2: Joi.number().required(),
    created_at: Joi.date().optional(),
});