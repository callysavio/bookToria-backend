import httpStatus from "http-status";
import Blog from "../../models/blog.js";

const allowedCategories = ["general", "food", "travel", "technology", "lifestyle"];

const createHandler = async (req, res) => {
  try {
    const { title, slug, content, image, category, tags, isPublished, userId } =
      req.body;

    const normalizedSlug =
      typeof slug === "string" ? slug.trim().toLowerCase() : "";
    const normalizedUserId =
      typeof userId === "string" ? userId.trim() : userId;

    if (!title || !normalizedSlug || !content || !category) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "title, slug, content, and category are required",
      });
    }

    // Validate userId if provided
    if (
      normalizedUserId &&
      !Blog.db.base.Types.ObjectId.isValid(normalizedUserId)
    ) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "userId must be a valid MongoDB ObjectId",
      });
    }

    if (!allowedCategories.includes(category)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: `category must be one of: ${allowedCategories.join(", ")}`,
      });
    }

    const existingBlog = await Blog.findOne({ slug: normalizedSlug });
    if (existingBlog) {
      return res.status(httpStatus.CONFLICT).json({
        statusCode: httpStatus.CONFLICT,
        success: false,
        message: "A blog post with this slug already exists",
      });
    }

    const blog = await Blog.create({
      title,
      slug: normalizedSlug,
      content,
      image,
      category,
      tags,
      isPublished,
      userId: normalizedUserId || undefined,
    });

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
        category: blog.category,
        tags: blog.tags,
        isPublished: blog.isPublished,
        userId: blog.userId,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      },
    });
  } catch (error) {
    if (error?.name === "ValidationError") {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "Invalid blog data",
        error: error.message,
      });
    }

    if (error?.code === 11000) {
      return res.status(httpStatus.CONFLICT).json({
        statusCode: httpStatus.CONFLICT,
        success: false,
        message: "A blog post with this slug already exists",
      });
    }

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "An error occurred while creating the blog post",
      error: error.message,
    });
  }
};

export const create = createHandler;
export const createBlog = createHandler;
