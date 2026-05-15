import Joi from "joi";

export const loginValidationSchema = Joi.object({
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
    })
})