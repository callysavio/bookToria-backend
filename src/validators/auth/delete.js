import Joi from "joi";

const deleteValidationSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.base": "ID must be a text",
    "string.empty": "ID cannot be empty",
    "string.hex": "ID must be a hexadecimal string",
    "string.length": "ID must be 24 characters long",
    "any.required": "ID is required",
  }),
});

export { deleteValidationSchema };
