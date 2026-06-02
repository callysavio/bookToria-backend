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

    const author = req.user?.id;

    if (!author) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: "Author session not found. Please log in again.",
      });
    }

    // Check duplicate title
    const existingBlog = await Blog.findOne({ title });

    if (existingBlog) {
      return res.status(httpStatus.CONFLICT).json({
        statusCode: httpStatus.CONFLICT,
        success: false,
        message: "A blog post with this title already exists",
      });
    }

    // Normalize tags
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
      blogImages: req.files?.map((file) => file.path) || [],
      blogImagePublicIds: req.files?.map((file) => file.filename) || [],
      author,
    });

    return res.status(httpStatus.CREATED).json({
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Blog post created successfully",
      data: blog,
    });
  } catch (error) {
    console.error("DEBUG CREATE BLOG ERROR:", error);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message:
        typeof error?.message === "string"
          ? error.message
          : "An error occurred",
      error: {
        name: error?.name,
        code: error?.code,
        details: error?.errors ?? null,
      },
    });
  }
};
