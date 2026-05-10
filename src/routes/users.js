import express from "express";
const router = express.Router();

import { registerValidationSchema } from "../validators/auth/register.js";
import { validate } from "../middlewares/validate.js";
import { register } from "../controllers/users/register.js";
import { updateUser } from "../controllers/users/update.js";
import { deleteUser } from "../controllers/users/delete.js";
// Define the route for user registration
router.post("/register", validate(registerValidationSchema), register);
// Define the route for user update
router.put("/update/:id", updateUser);
// Define the route for user deletion
router.delete("/delete/:id", deleteUser);

// Export the router
export default router;
