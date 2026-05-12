import express from "express";
const router = express.Router();

import { registerValidationSchema } from "../validators/auth/register.js";
import { validate } from "../middlewares/validate.js";
import { register } from "../controllers/auth/register.js";
import { login } from "../controllers/auth/login.js";
import { updateUser } from "../controllers/users/update.js";
import { deleteUser } from "../controllers/users/delete.js";
// Define the route for user registration
router.post("/register", validate(registerValidationSchema), register);
<<<<<<< HEAD
// Define the route for user update
=======
router.post("/login", login);
>>>>>>> 8988839abf77ff395c9994768911281cf06ff53c
router.put("/update/:id", updateUser);
// Define the route for user deletion
router.delete("/delete/:id", deleteUser);

// Export the router
export default router;
