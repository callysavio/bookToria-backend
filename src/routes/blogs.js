import express from "express";
<<<<<<< HEAD
import { authMiddleware } from "../middlewares/auth.js";
=======
import authMiddleware from "../middlewares/auth.js";
>>>>>>> 38e635b4e7ef2539f965217c7e409c84fe49e320
import authorizeRoles from "../middlewares/authorizeRole.js";
import { createBlog } from "../controllers/blog/create.js";
import { updateBlog } from "../controllers/blog/updateBlog.js";
import fetchBlogs from "../controllers/blog/fetchBlogs.js";
import fetchBlogById from "../controllers/blog/fetchBlogById.js";
import { deleteBlog } from "../controllers/blog/deleteBlog.js";
import upload from "../middlewares/multer.js";
const router = express.Router();
router.post(
  "/create",
  authMiddleware,
  authorizeRoles("admin"),
<<<<<<< HEAD
  upload.array("blogImage", 5),
=======
  upload.single("blogImage"),
>>>>>>> 38e635b4e7ef2539f965217c7e409c84fe49e320
  createBlog,
);
router.get("/fetch", fetchBlogs);
router.get("/details/:id", fetchBlogById);
<<<<<<< HEAD
router.put(
  "/update/:id",
  authMiddleware,
  upload.array("blogImage", 5),
  updateBlog,
);
=======
>>>>>>> 38e635b4e7ef2539f965217c7e409c84fe49e320
router.delete(
  "/delete/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteBlog,
);
export default router;
