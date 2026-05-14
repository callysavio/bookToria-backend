import Joi from "joi";

const updateBlogValidationSchema = Joi.object({
    title: Joi.string().min(3).max(100).optional().messages({
        "string.base": "Title must be a text",
        "string.empty": "Title cannot be empty",
        "string.min": "Title must be at least 3 characters",
        "string.max": "Title cannot exceed 100 characters",
    }),
    content: Joi.string().min(10).optional().messages({
        "string.base": "Content must be a text",
        "string.empty": "Content cannot be empty",
        "string.min": "Content must be at least 10 characters",
    }),
    status: Joi.string().valid("draft", "published").optional().messages({
        "any.only": "Status must be either draft or published",
    }),
    category: Joi.string()
        .valid("technology", "lifestyle", "travel", "food", "education")
        .optional()
        .messages({
            "string.base": "Category must be a text",
            "string.empty": "Category cannot be empty",
            "any.only": "Category must be one of technology, lifestyle, travel, food, or education",
        }),
    tags: Joi.array().items(Joi.string()).optional().messages({
        "array.base": "Tags must be an array",
    }),
}).min(1).messages({
    "object.min": "At least one field is required for update",
});

export default updateBlogValidationSchema;
