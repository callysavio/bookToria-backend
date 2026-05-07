import express from "express";
import { register } from "../controllers/users/register.js";
const router = express.Router();
import { updateUser } from "../controllers/users/update.js";
import { deleteUser } from "../controllers/users/delete.js";
// Define the route for user registration
router.post("/register", register);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
export default router;
