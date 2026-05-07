import Joi from "joi";

export const registerSchema = Joi.object({
    usernname: Joi.string().required(),
    email: Joi.string().email().required(),


})