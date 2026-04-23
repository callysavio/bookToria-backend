import express from "express";
const router = express.Router();
import { register } from "../controllers/users/register.js";
// Define the route for user registration
router.post("/register", register);
export default router;
