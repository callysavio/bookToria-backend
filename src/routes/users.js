import express from "express";
import { register } from "../controllers/users/register.js";

const router = express.Router();
// Define the route for user registration
router.post("/register", register);
router.put("/update/:id", updateUser);
export default router;
