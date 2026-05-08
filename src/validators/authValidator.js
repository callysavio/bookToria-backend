import Joi from "joi";

const registerValidationSchema = Joi.object({
 username: Joi.string()
   .min(6)
   .max(20)
   .required()
   .messages({
     "string.base": "Username must be a text",
     "string.empty": "Username cannot be empty",
     "string.min": "Username must be at least 6 characters",
     "string.max": "Username cannot exceed 20 characters",
     "any.required": "Username is required",
   }),

 email: Joi.string()
   .email()
   .required()
   .messages({
     "string.base": "Email must be a text",
     "string.empty": "Email cannot be empty",
     "string.email": "Please provide a valid email address",
     "any.required": "Email is required",
   }),

 password: Joi.string()
   .min(6)
   .max(100)
   .required()
   .messages({
     "string.base": "Password must be a text",
     "string.empty": "Password cannot be empty",
     "string.min": "Password must be at least 6 characters",
     "string.max": "Password cannot exceed 100 characters",
     "any.required": "Password is required",
   }),

 role: Joi.string()
   .valid("user", "admin")
   .default("user")
   .messages({
     "any.only": "Role must be either user or admin",
   }),
});

export { registerValidationSchema };


const updateUserValidationSchema = Joi.object({
 username: Joi.string()
   .min(6)
   .max(20)
   .messages({
     "string.base": "Username must be a text",
     "string.min": "Username must be at least 6 characters",
     "string.max": "Username cannot exceed 20 characters",
   }),

 email: Joi.string()
   .email()
   .messages({
     "string.email": "Please provide a valid email",
   }),

 password: Joi.string()
   .min(6)
   .max(100)
   .messages({
     "string.min": "Password must be at least 6 characters",
     "string.max": "Password cannot exceed 100 characters",
   }),

 role: Joi.string()
   .valid("user", "admin")
   .messages({
     "any.only": "Role must be either user or admin",
   }),
});

export { updateUserValidationSchema };


const blogValidationSchema = Joi.object({    
    title: Joi.string().min(6).max(50).required(),
    description: Joi.string().min(6).max(500).required(),
    author: Joi.string().min(6).max(50).required(),
    category: Joi.string().min(6).max(20).required(),
    body: Joi.string().min(6).max(1000).required(),
});

export { blogValidationSchema };


const updateBlogValidationSchema = Joi.object({    
    title: Joi.string().min(6).max(50).required(),
    description: Joi.string().min(6).max(500).required(),    
    body: Joi.string().min(6).max(1000).required(),
}); 

export { updateBlogValidationSchema };  