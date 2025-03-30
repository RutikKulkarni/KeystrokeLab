import Joi from "joi";

export const sessionSchema = Joi.object({
  userId: Joi.string().required(),
  wpm: Joi.number().required().min(0),
  accuracy: Joi.number().required().min(0).max(100),
  totalErrors: Joi.number().required().min(0),
  errorWords: Joi.array().items(Joi.string()),
  typingDurations: Joi.array().items(Joi.number()),
  duration: Joi.number().valid(15, 30).required(),
  text: Joi.string().required(),
});
