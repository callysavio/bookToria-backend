import Joi from "joi";

const updateValidationSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.base": "ID must be a text",
    "string.empty": "ID cannot be empty",
  }),
  title: Joi.string().min(3).max(50).messages({
    "string.base": "Title must be a text",
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title cannot exceed 50 characters",
  }),
  content: Joi.string().email().messages({
    "string.base": "Content must be a text",
    "string.empty": "Content cannot be empty",
    "string.email": "Please provide a valid email address",
  }),
  category: Joi.string().min(6).max(100).messages({
    "string.base": "Category must be a text",
    "string.empty": "Category cannot be empty",
    "string.min": "Category must be at least 6 characters",
    "string.max": "Category cannot exceed 100 characters",
  }),
  tags: Joi.string().valid("user", "admin").messages({
    "any.only": "Role must be either user or admin",
  }),
  author: Joi.string().min(3).max(50).messages({
    "string.base": "Author must be a text",
    "string.empty": "Author cannot be empty",
    "string.min": "Author must be at least 3 characters",
    "string.max": "Author cannot exceed 50 characters",
  }),
});

export { updateValidationSchema };
