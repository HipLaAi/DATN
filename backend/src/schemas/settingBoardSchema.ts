import Joi from "joi";

export const settingBoardSchema = Joi.object({
    settingboard_id: Joi.number().optional(),
    board_id: Joi.number().optional(),
    action: Joi.any().optional(),
    permission: Joi.any().optional(),
})
