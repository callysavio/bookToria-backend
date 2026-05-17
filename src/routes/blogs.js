import express from "express";
import authMiddleware from "../middlewares/auth.js";
import authorizeRoles from "../middlewares/authorizeRole.js";
import { createBlog } from "../controllers/blog/create.js";
import fetchBlogs from "../controllers/blog/fetchBlogs.js";
import fetchBlogById from "../controllers/blog/fetchBlogById.js";
import { deleteBlog } from "../controllers/blog/deleteBlog.js";
import upload from "../middlewares/multer.js";
import { validate } from "../middlewares/validate.js";
import createBlogValidationSchema from "../validators/blog/create.js";
import { updateBlog } from "../controllers/blog/updateBlog.js";

const router = express.Router();
router.post(
  "/create",
  authMiddleware,
  authorizeRoles("admin"),
  upload.single("blogImage"),
  validate(createBlogValidationSchema),
  createBlog,
);
router.get("/fetch", fetchBlogs);
router.get("/details/:id", fetchBlogById);
router.delete(
  "/delete/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteBlog,
);
router.put(
  "/update/:id",
  authMiddleware,
  authorizeRoles("admin"),
  upload.single("blogImage"),
  validate(createBlogValidationSchema),
  updateBlog,
);
export default router;
