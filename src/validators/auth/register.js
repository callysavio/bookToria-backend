import Joi from "joi";

export const registerValidationSchema = Joi.object({
  username: Joi.string().min(6).max(20).required().messages({
    "string.base": "Username must be a text",
    "string.empty": "Username cannot be empty",
    "string.min": "Username must be at least 6 characters",
    "string.max": "Username cannot exceed 20 characters",
    "any.required": "Username is required",
  }),

  email: Joi.string().email().required().messages({
    "string.base": "Email must be a text",
    "string.empty": "Email cannot be empty",
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(6).max(100).required().messages({
    "string.base": "Password must be a text",
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 6 characters",
    "string.max": "Password cannot exceed 100 characters",
    "any.required": "Password is required",
  }),

  role: Joi.string().valid("user", "admin").default("user").messages({
    "any.only": "Role must be either user or admin",
  }),
});
