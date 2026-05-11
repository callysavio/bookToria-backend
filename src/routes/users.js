import express from "express";
import { registerValidationSchema } from "../validators/auth/register.js";
import { validate } from "../middlewares/validate.js";
import { register } from "../controllers/auth/register.js";
import { login } from "../controllers/auth/login.js";
import { updateUser } from "../controllers/users/update.js";
import { deleteUser } from "../controllers/users/delete.js";

const router = express.Router();

// Define the route for user registration
router.post("/register", validate(registerValidationSchema), register);
router.post("/login", login);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
export default router;
