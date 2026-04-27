import express from "express";
import { register } from "../controllers/users/register.js";

const router = express.Router();
// Define the route for user registration
router.post("/register", register);
export default router;
