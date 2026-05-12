import express from "express";
const router = express.Router();
import authMiddleware from "../middlewares/auth.js";
import authorizeRoles from "../middlewares/authorizeRole.js";
import { registerValidationSchema } from "../validators/auth/register.js";
import { validate } from "../middlewares/validate.js";
import { register } from "../controllers/auth/register.js";
import { login } from "../controllers/auth/login.js";
import { updateUser } from "../controllers/users/update.js";
import { deleteUser } from "../controllers/users/delete.js";
// Define the route for user registration
router.post("/register", validate(registerValidationSchema), register);
router.post("/login", login);
router.put(
  "/update/:id",
  authMiddleware,
  authorizeRoles("admin", "user"),
  updateUser,
);
router.delete(
  "/delete/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteUser,
);
export default router;
