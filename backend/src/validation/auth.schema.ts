import Joi from 'joi';

export const registerSchema = Joi.object({
  username: Joi.string().required().min(3).max(30),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6)
});

export const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required()
});