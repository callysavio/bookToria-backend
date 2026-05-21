import express from "express";
const router = express.Router();

<<<<<<< HEAD
import { authMiddleware } from "../middlewares/auth.js";
=======
import authMiddleware from "../middlewares/auth.js";
>>>>>>> 38e635b4e7ef2539f965217c7e409c84fe49e320
import authorizeRoles from "../middlewares/authorizeRole.js";
import { registerValidationSchema } from "../validators/auth/register.js";
import { validate } from "../middlewares/validate.js";
import { register } from "../controllers/auth/register.js";
import { login } from "../controllers/auth/login.js";
import { updateUser } from "../controllers/users/update.js";
import { deleteUser } from "../controllers/users/delete.js";
<<<<<<< HEAD
import upload from "../middlewares/multer.js";

// Define the route for user registration
router.post(
  "/register",
  validate(registerValidationSchema),
  upload.single("profilePicture"),
  register,
);
router.post("/login/", login);
=======
// import { apiLimiter } from "../middlewares/apiLimiter.js";
// Define the route for user registration
router.post("/register", validate(registerValidationSchema), register);
router.post("/login", login);
>>>>>>> 38e635b4e7ef2539f965217c7e409c84fe49e320
router.put(
  "/update/:id",
  authMiddleware,
  authorizeRoles("admin", "user"),
<<<<<<< HEAD
  upload.single("profilePicture"),
=======
>>>>>>> 38e635b4e7ef2539f965217c7e409c84fe49e320
  updateUser,
);
router.delete(
  "/delete/:id",
  authMiddleware,
  authorizeRoles("admin"),
<<<<<<< HEAD
  upload.single("profilePicture"),
=======
>>>>>>> 38e635b4e7ef2539f965217c7e409c84fe49e320
  deleteUser,
);
export default router;
