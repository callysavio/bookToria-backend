import express from "express";
const router = express.Router();
import { register } from "../controllers/users/register.js";
import { updateUser } from "../controllers/users/update.js";
import { deleteUser } from "../controllers/users/delete.js";
import { validate } from "../middlewares/validate.js";
import { registerValidationSchema } from "../validators/auth/register.js";
// Define the route for user registration
router.post("/register", validate(registerValidationSchema), register);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
export default router;
