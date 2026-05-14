import express from "express";
import { createBlog } from "../controllers/blog/create.js";
import fetchBlogs from "../controllers/blog/fetchBlogs.js";
import fetchBlogById from "../controllers/blog/fetchBlogById.js";
import { deleteBlog } from "../controllers/blog/deleteBlog.js";
import { validate } from "../middlewares/validate.js";
import createBlogValidationSchema from "../validators/blog/create.js";
import blogIdParamsSchema from "../validators/blog/params.js";
const router = express.Router();
router.post("/create", validate(createBlogValidationSchema), createBlog);
router.get("/fetch", fetchBlogs);
router.get("/details/:id", validate(blogIdParamsSchema, "params"), fetchBlogById);
router.delete("/delete/:id", validate(blogIdParamsSchema, "params"), deleteBlog);

export default router;
