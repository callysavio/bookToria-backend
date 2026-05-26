import Blog from "../../models/blog.js";
import httpStatus from "http-status";
import User from "../../models/user.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content, category, tags, author } = req.body;

    const existingBlog = await Blog.findOne({ title });
    if (existingBlog) {
      return res.status(httpStatus.CONFLICT).json({
        statusCode: httpStatus.CONFLICT,
        success: false,
        message: `A blog post with this title "${title}" already exists`,
      });
    }

    const tagArray =
      typeof tags === "string"
        ? tags.split(",").map((tag) => tag.trim())
        : Array.isArray(tags)
          ? tags
          : [];

    const blogImageUrl = req.file?.secure_url || req.file?.url || req.file?.path || "";
    const blogImagePublicId =
      req.file?.public_id || req.file?.filename || req.file?.file_id || "";

    const blog = await Blog.create({
      title,
      content,
      category,
      tags: tagArray,
      blogImage: req.file?.path || "",
      blogImagePublicId: req.file?.filename || "",
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
