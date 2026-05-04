import express from "express";
const router = express.Router();
import { create } from "../controllers/blog/create.js";
import { fetchBlogs } from "../controllers/blog/fetchBlogs.js";

// Create aliases for creating a blog post
router.post("/", create);
router.post("/create", create);

// Fetch blogs
router.get("/", fetchBlogs);
router.get("/fetch", fetchBlogs);

export default router;
