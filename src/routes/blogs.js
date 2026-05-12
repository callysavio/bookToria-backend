import express from "express";
import authMiddleware from "../middlewares/auth.js";
import authorizeRoles from "../middlewares/authorizeRole.js";
import { createBlog } from "../controllers/blog/create.js";
import fetchBlogs from "../controllers/blog/fetchBlogs.js";
import fetchBlogById from "../controllers/blog/fetchBlogById.js";
import { deleteBlog } from "../controllers/blog/deleteBlog.js";
const router = express.Router();
router.post("/create", authMiddleware, authorizeRoles("admin"), createBlog);
router.get("/fetch", fetchBlogs);
router.get("/details/:id", fetchBlogById);
router.delete(
  "/delete/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteBlog,
);
export default router;
