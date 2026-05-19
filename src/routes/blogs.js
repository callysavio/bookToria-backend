import express from "express";
import authMiddleware from "../middlewares/auth.js";
import authorizeRoles from "../middlewares/authorizeRole.js";
import { createBlog } from "../controllers/blog/create.js";
import fetchBlogs from "../controllers/blog/fetchBlogs.js";
import fetchBlogById from "../controllers/blog/fetchBlogById.js";
import { deleteBlog } from "../controllers/blog/deleteBlog.js";
import {
  updateBlogImage,
  updateBlogImages,
} from "../controllers/blog/updateBlogImages.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

const blogUploadFields = upload.fields([
  { name: "blogImage", maxCount: 1 },
  { name: "blogImages", maxCount: 5 },
]);

router.post(
  "/create",
  authMiddleware,
  authorizeRoles("admin"),
  blogUploadFields,
  createBlog,
);
router.get("/fetch", fetchBlogs);
router.get("/details/:id", fetchBlogById);
router.put(
  "/update-image/:id",
  authMiddleware,
  authorizeRoles("admin"),
  upload.single("blogImage"),
  updateBlogImage,
);
router.put(
  "/update-images/:id",
  authMiddleware,
  authorizeRoles("admin"),
  upload.array("blogImages", 5),
  updateBlogImages,
);
router.delete(
  "/delete/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteBlog,
);
export default router;
