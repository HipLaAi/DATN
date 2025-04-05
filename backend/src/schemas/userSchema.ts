import Joi from "joi";

export const userSchema = Joi.object({
    name: Joi.string().pattern(/^[\p{L}\p{N} ]*$/u).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    files: Joi.any().optional(),
});