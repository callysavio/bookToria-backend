import express from "express";
import {
  blogsPerCategory,
  getBlogStatusStats,
  getBlogsWithAuthors,
} from "../../controllers/analytics/blogs.js";
import { authMiddleware } from "../../middlewares/auth.js";
import authorizeRoles from "../../middlewares/authorizeRole.js";
const router = express.Router();
//Analytics routes
router.get(
  "/blogs-per-category",
  authMiddleware,
  authorizeRoles("admin"),
  blogsPerCategory,
);
router.get(
  "/blog-status-stats",
  authMiddleware,
  authorizeRoles("admin"),
  getBlogStatusStats,
);

router.get(
  "/blogs-with-authors",
  authMiddleware,
  authorizeRoles("admin"),
  getBlogsWithAuthors,
);
export default router;
