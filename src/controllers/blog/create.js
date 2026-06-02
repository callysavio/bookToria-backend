import httpStatus from "http-status";
import mongoose from "mongoose";
import Blog from "../../models/blog.js";
import httpStatus from "http-status";

export const createBlog = async (req, res) => {
  try {
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
      return rejectWithCleanup(httpStatus.CONFLICT, {
        statusCode: httpStatus.CONFLICT,
        success: false,
        message: "A blog post with this slug already exists",
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
      author,
      blogImage: req.file?.path || "",
      blogImagePublicId: req.file?.filename || "",
    });
    blogCreated = true;

    return res.status(httpStatus.CREATED).json({
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Blog post created successfully",
      data: {
        id: blog._id,
        title: blog.title,
        slug: blog.slug,
        content: blog.content,
        image: blog.image,
        blogImage: blog.blogImage,
        blogImagePublicId: blog.blogImagePublicId,
        blogImages: blog.blogImages,
        category: blog.category,
        tags: blog.tags,
        status: blog.status,
        isPublished: blog.isPublished,
        userId: blog.userId,
        author: blog.author,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      },
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

export const create = createBlogHandler;
export const createBlog = createBlogHandler;
