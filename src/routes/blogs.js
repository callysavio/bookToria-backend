import express from "express";
import authMiddleware from "../middlewares/auth.js";
import authorizeRoles from "../middlewares/authorizeRole.js";
import { createBlog } from "../controllers/blog/create.js";
import fetchBlogs from "../controllers/blog/fetchBlogs.js";
import fetchBlogById from "../controllers/blog/fetchBlogById.js";
import { updateBlog } from "../controllers/blog/updateBlog.js";
import { deleteBlog } from "../controllers/blog/deleteBlog.js";
import upload from "../middlewares/multer.js";
import { searchBlogs } from "../controllers/analytics/blogs.js";
import { uploadBlogImages } from "../controllers/blog/uploadImages.js";
const router = express.Router();
router.get("/search", authMiddleware, searchBlogs);
router.post(
  "/create",
  authMiddleware,
  authorizeRoles("admin"),
  upload.single("blogImage"),
  createBlog,
);
router.get("/fetch", fetchBlogs);
router.get("/details/:id", fetchBlogById);
router.put(
  "/update/:id",
  authMiddleware,
  authorizeRoles("admin"),
  upload.single("blogImage"),
  updateBlog,
);
router.post(
  "/upload-images",
  authMiddleware,
  authorizeRoles("admin"),
  upload.array("blogImages", 5),
  uploadBlogImages,
);
router.delete(
  "/delete/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteBlog,
);
export default router;
