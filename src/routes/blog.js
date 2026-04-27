import express from "express";
const router = express.Router();
import { create } from "../controllers/blog/create.js";

// Define aliases for creating a blog post
router.post("/", create);
router.post("/create", create);

export default router;
