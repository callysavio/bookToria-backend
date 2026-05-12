import Joi from "joi";
// Define the validation schema for user registration

const createBlogValidationSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  content: Joi.string().min(10).required(),
  category: Joi.string().min(3).max(50).required(),
  tags: Joi.array().items(Joi.string().min(2).max(30)).optional(),
});

const updateBlogValidationSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  content: Joi.string().min(10).optional(),
  category: Joi.string().min(3).max(50).optional(),
  tags: Joi.array().items(Joi.string().min(2).max(30)).optional(),
});

export { createBlogValidationSchema, updateBlogValidationSchema };
