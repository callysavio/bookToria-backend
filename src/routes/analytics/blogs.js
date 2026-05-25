import express from "express";
import {
  adminDashboardStats,
  blogsLast7Days,
  blogsPerCategory,
  blogTagsStats,
  getBlogStatusStats,
  getBlogsWithAuthors,
  paginatedBlogs,
  recentPublishedBlogs,
  topAuthors,
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

router.get("/top-authors", authMiddleware, authorizeRoles("admin"), topAuthors);

router.get(
  "/recent-published-blogs",
  authMiddleware,
  authorizeRoles("admin"),
  recentPublishedBlogs,
);

router.get(
  "/blogs-in-last-7-days",
  authMiddleware,
  authorizeRoles("admin"),
  blogsLast7Days,
);

router.get(
  "/blog-tags-stats",
  authMiddleware,
  authorizeRoles("admin"),
  blogTagsStats,
);

router.get(
  "/paginated-blogs",
  authMiddleware,
  authorizeRoles("admin"),
  paginatedBlogs,
);

router.get(
  "/admin-dashboard",
  authMiddleware,
  authorizeRoles("admin"),
  adminDashboardStats,
);

export default router;
