import express from "express";
const router = express.Router();
import { register } from "../controllers/users/register.js";
import { updateUser } from "../controllers/users/update.js";
// Define the route for user registration
router.post("/register", register);
router.put("/update/:id", updateUser);
export default router;