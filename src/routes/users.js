import express from "express";
const router = express.Router();

import { registerValidationSchema } from "../validators/auth/register.js";
import { validate } from "../middlewares/validate.js";
import { register } from "../controllers/auth/register.js";
import { login } from "../controllers/auth/login.js";
import { updateUser } from "../controllers/users/update.js";
import { deleteUser } from "../controllers/users/delete.js";
import { loginValidationSchema } from "../validators/auth/login.js";
import { updateValidationSchema } from "../validators/auth/update.js";
import { deleteValidationSchema } from "../validators/auth/delete.js";
// Define the route for user registration
router.post("/register", validate(registerValidationSchema), register);
router.post("/login", validate(loginValidationSchema), login);
router.put("/update/:id", validate(updateValidationSchema), updateUser);
router.delete("/delete/:id", validate(deleteValidationSchema), deleteUser);
export default router;
