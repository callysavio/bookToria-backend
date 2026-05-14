import Joi from "joi";

const blogIdParamsSchema = Joi.object({
  id: Joi.string().length(24).hex().required().messages({
    "string.base": "Blog ID must be a text",
    "string.empty": "Blog ID cannot be empty",
    "string.length": "Blog ID must be 24 characters long",
    "string.hex": "Blog ID must be a valid Mongo ID",
    "any.required": "Blog ID is required",
  }),
});

export default blogIdParamsSchema;
