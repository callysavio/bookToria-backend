import express from "express";
import {
  blogsPerCategory,
  getBlogsByStatusStats,
  getBlogsByAuthorStats,
} from "../../controllers/analytics/blog.js";
import authMiddleware from "../../middlewares/auth.js";
import authorizeRoles from "../../middlewares/authorizeRole.js";

const router = express.Router();

router.get(
  "/blogs-per-category",
  authMiddleware,
  authorizeRoles("admin"),
  blogsPerCategory,
);
router.get(
  "/blogs-by-status-stats",
  authMiddleware,
  authorizeRoles("admin"),
  getBlogsByStatusStats,
);
router.get(
  "/blogs-by-author-stats",
  authMiddleware,
  authorizeRoles("admin"),
  getBlogsByAuthorStats,
);

export default router;
