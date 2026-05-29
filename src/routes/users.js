import express from "express";
const router = express.Router();
import authMiddleware from "../middlewares/auth.js";
import authorizeRoles from "../middlewares/authorizeRole.js";
import { registerValidationSchema } from "../validators/auth/register.js";
import { validate } from "../middlewares/validate.js";
import { register } from "../controllers/auth/register.js";
import { login } from "../controllers/auth/login.js";
import { verifyOtp } from "../controllers/auth/verifyOtp.js";
import { updateUser } from "../controllers/users/update.js";
import { deleteUser } from "../controllers/users/delete.js";
import { loginValidationSchema } from "../validators/auth/login.js";
import { updateValidationSchema } from "../validators/auth/update.js";
import { deleteValidationSchema } from "../validators/auth/delete.js";
import upload from "../middlewares/multer.js";
import { apiLimiter } from "../middlewares/apiLimiter.js";
// Define the route for user registration
router.post(
  "/register",
  upload.single("profilePicture"),
  validate(registerValidationSchema),
  register,
);
router.post("/login", validate(loginValidationSchema), login);
router.post("/verify-otp", verifyOtp);
router.put(
  "/update/:id",
  validate(updateValidationSchema),
  authMiddleware,
  authorizeRoles("admin", "user"),
  updateUser,
);
router.delete(
  "/delete/:id",
  validate(deleteValidationSchema),
  authMiddleware,
  authorizeRoles("admin"),
  deleteUser,
);
export default router;
