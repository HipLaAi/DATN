import Joi from "joi";

export const meetingSchema = Joi.object({
    summary: Joi.any().optional(),
    description: Joi.any().optional(),
    start: Joi.any().optional(),
    end: Joi.any().optional(),
    attendees: Joi.any().optional(),
    conferenceData: Joi.any().optional(),
});
