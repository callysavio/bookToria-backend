import express from "express";
import authMiddleware from "../middlewares/auth.js";
import authorizeRoles from "../middlewares/authorizeRole.js";
import { createBlog } from "../controllers/blog/create.js";
import fetchBlogs from "../controllers/blog/fetchBlogs.js";
import fetchBlogById from "../controllers/blog/fetchBlogById.js";
import { deleteBlog } from "../controllers/blog/deleteBlog.js";
import { validate } from "../middlewares/validate.js";
import createBlogValidationSchema from "../validators/blog/create.js";
import blogIdParamsSchema from "../validators/blog/params.js";
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
