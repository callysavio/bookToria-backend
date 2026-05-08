import Joi from "joi";
// Define the validation schema for user registration
const registerValidationSchema = Joi.object({
  username: Joi.string().min(6).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
  role: Joi.string().valid("user", "admin").default("user"),
});
export { registerValidationSchema };

//Define the validation schema for blog creation
const createBlogValidationSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  content: Joi.string().min(10).required(),
  category: Joi.string().min(3).max(50).required(),
  tags: Joi.array().items(Joi.string().min(2).max(30)).default([]),
});
export { createBlogValidationSchema };
