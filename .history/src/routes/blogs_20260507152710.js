import express from "express";
import { createBlog } from "../controllers/blog/create.js";
import fetchBlogs from "../controllers/blog/fetchBlogs.js";
import fetchBlogById from "../controllers/blog/fetchBlogById.js";
im
const router = express.Router();
router.post("/create", createBlog);
router.get("/fetch", fetchBlogs);
router.get("/details/:id", fetchBlogById);
export default router;
