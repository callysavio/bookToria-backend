import Joi from "joi";

// Define the validation schema for creating a blog post
const createBlogValidationSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  content: Joi.string().min(20).required(),
  category: Joi.string()
    .valid("Technology", "Lifestyle", "Travel", "Food", "Education")
    .required(),
  tags: Joi.array().items(Joi.string()).max(10),
});

const updateBlogValidationSchema = Joi.object({
  title: Joi.string().min(5).max(100),
  content: Joi.string().min(20),
  category: Joi.string().valid(
    "Technology",
    "Lifestyle",
    "Travel",
    "Food",
    "Education",
  ),
  tags: Joi.array().items(Joi.string()).max(10),
});

export { createBlogValidationSchema, updateBlogValidationSchema };
