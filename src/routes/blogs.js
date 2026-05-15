import express from "express";
import authMiddleware from "../middlewares/auth.js";
import authorizeRoles from "../middlewares/authorizeRole.js";
import { createBlog } from "../controllers/blog/create.js";
import fetchBlogs from "../controllers/blog/fetchBlogs.js";
import fetchBlogById from "../controllers/blog/fetchBlogById.js";
import { updateBlog } from "../controllers/blog/update.js";
import { deleteBlog } from "../controllers/blog/deleteBlog.js";
import upload from "../middlewares/multer.js";
const router = express.Router();
router.post(
  "/create",
  authMiddleware,
  authorizeRoles("admin"),
  upload.single("blogImage"),
  createBlog,
);
router.get("/fetch", fetchBlogs);
router.get("/details/:id", fetchBlogById);  
router.put("/update/:id", updateBlog);
router.delete(
  "/delete/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteBlog,
);
export default router;
