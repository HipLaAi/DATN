import Joi from "joi";

export const messageSchema = Joi.object({
    message_id: Joi.number().optional(),
    conversation_id: Joi.number().required(),
    sender_id: Joi.number().required(),
    message: Joi.string().required(),
    created_at: Joi.date().optional(),
    update_at: Joi.date().optional(),
});