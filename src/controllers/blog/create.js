import Blog from "../../models/blog.js";
import httpStatus from "http-status";
import { createBlogValidationSchema } from "../../validators/blogValidator.js";

export const createBlog = async (req, res) => {
  try {
    // 1. Get blog data from the request body and validate it
    const { error } = createBlogValidationSchema.validate(req.body);
    if (error) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "Invalid blog post data",
        error: error.details.map((detail) => detail.message),
      });
    }

    const { title, content, category, tags } = req.body;

    const existingBlog = await Blog.findOne({ title });
    if (existingBlog) {
      return res.status(httpStatus.CONFLICT).json({
        statusCode: httpStatus.CONFLICT,
        success: false,
        message: "A blog post with this title already exists",
      });
    }

    const tagArray =
      typeof tags === "string"
        ? tags.split(",").map((tag) => tag.trim())
        : Array.isArray(tags)
          ? tags
          : [];

    const blog = await Blog.create({
      title,
      content,
      category,
      tags: tagArray,
      blogImage: req.file?.path || "",
      blogImagePublicId: req.file?.filename || "",
    });

    return res.status(httpStatus.CREATED).json({
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Blog post created successfully",
      data: blog,
    });
  } catch (error) {
    console.error("DEBUG CREATE BLOG ERROR:", error);

    // Safely convert message to string — handles object messages from Cloudinary/Mongoose
    const message =
      typeof error?.message === "string"
        ? error.message
        : (JSON.stringify(error?.message) ?? "An error occurred");

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message,
      error: {
        name: error?.name,
        code: error?.code,
        details: error?.errors ?? null,
      },
    });
  }
};
