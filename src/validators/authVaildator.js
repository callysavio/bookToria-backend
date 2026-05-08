import Joi from "joi";
// Define the validation schema for user registration
const registerValidationSchema = Joi.object({
  username: Joi.string().min(6).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
  role: Joi.string().valid("user", "admin").default("user"),
});
export { registerValidationSchema };


