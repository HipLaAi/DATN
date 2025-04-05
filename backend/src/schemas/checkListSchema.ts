import Joi from "joi";

export const checkListSchema = Joi.object({
    checklistname_id: Joi.number().optional(),
    card_id: Joi.number().optional(),
    name: Joi.string().pattern(/^[\p{L}\p{N} ]*$/u).optional(),

    checklist_id: Joi.number().optional(),
    user_id: Joi.any().optional(),
    timer: Joi.any().optional(),
    status: Joi.string().optional(),
});