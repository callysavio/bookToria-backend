import express from "express";
import { createBlog } from "../controllers/blog/create.js";

const router = express.Router();

router.post("/create", createBlog);

export default router;