import Joi from "joi";

const createBlogValidationSchema = Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
        "string.base": "Title must be a text",
        "string.empty": "Title cannot be empty",
        "string.min": "Title must be at least 3 characters",
        "string.max": "Title cannot exceed 100 characters",
        "any.required": "Title is required",
    }),
    content: Joi.string().min(10).required().messages({
        "string.base": "Content must be a text",
        "string.empty": "Content cannot be empty",
        "string.min": "Content must be at least 10 characters",
        "any.required": "Content is required",
    }),
    status: Joi.string().valid("draft", "published").optional().messages({
        "any.only": "Status must be either draft or published",
    }),
    category: Joi.string()
        .valid("technology", "lifestyle", "travel", "food", "education", "life")
        .required()
        .messages({
            "string.base": "Category must be a text",
            "string.empty": "Category cannot be empty",
            "any.only": "Category must be one of technology, lifestyle, travel, life, food, or education",
            "any.required": "Category is required",
        }),
    tags: Joi.array().items(Joi.string()).optional().messages({
        "array.base": "Tags must be an array",
    }),
});

export default createBlogValidationSchema;
