import express from "express";
import {
  blogsPerCategory,
  getBlogStatusStats,
  getBlogsWithAuthors,
  topAuthors,
  recentPublishedBlogs,
  blogsLast7Days,
  blogTagsStats,
  paginatedBlogs,
} from "../../controllers/analytics/blogs.js";
import authMiddleware from "../../middlewares/auth.js";
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
router.get(
  "/top-authors",
  authMiddleware,
  authorizeRoles("admin"),
  topAuthors,
);
router.get(
  "/recent-published-blogs",
  authMiddleware,
  recentPublishedBlogs,
);
router.get(
  "/blogs-last-7-days",
  authMiddleware,
  blogsLast7Days,
);
router.get(
  "/blog-tags-stats",
  authMiddleware,
  blogTagsStats,
);
router.get(
  "/paginated-blogs",
  authMiddleware,
  paginatedBlogs,
);

export default router;
