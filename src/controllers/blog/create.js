import httpStatus from "http-status";
import mongoose from "mongoose";
import Blog from "../../models/blog.js";
import {
  cleanupUploadedFiles,
  getUploadedFile,
  getUploadedFiles,
  toCloudinaryImage,
} from "../../utils/cloudinaryAssets.js";

const allowedCategories = ["general", "food", "travel", "technology", "lifestyle"];

const normalizeTags = (tags) => {
  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  if (Array.isArray(tags)) {
    return tags.map((tag) => String(tag).trim()).filter(Boolean);
  }

  return [];
};

const normalizeBoolean = (value, defaultValue) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalizedValue = value.trim().toLowerCase();

    if (normalizedValue === "true") {
      return true;
    }

    if (normalizedValue === "false") {
      return false;
    }
  }

  return defaultValue;
};

const createBlogHandler = async (req, res) => {
  const coverImage = getUploadedFile(req, "blogImage");
  const galleryImages = getUploadedFiles(req, "blogImages");
  const uploadedFiles = [coverImage, ...galleryImages].filter(Boolean);
  let blogCreated = false;

  const rejectWithCleanup = async (statusCode, payload) => {
    await cleanupUploadedFiles(uploadedFiles);

    return res.status(statusCode).json(payload);
  };

  try {
    const { title, slug, content, image, category, tags, isPublished, userId } =
      req.body;

    const normalizedTitle = typeof title === "string" ? title.trim() : "";
    const normalizedSlug =
      typeof slug === "string" ? slug.trim().toLowerCase() : "";
    const normalizedContent = typeof content === "string" ? content.trim() : "";
    const normalizedCategory =
      typeof category === "string" ? category.trim().toLowerCase() : "";
    const normalizedUserId =
      typeof userId === "string" ? userId.trim() : userId;

    if (
      !normalizedTitle ||
      !normalizedSlug ||
      !normalizedContent ||
      !normalizedCategory
    ) {
      return rejectWithCleanup(httpStatus.BAD_REQUEST, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "title, slug, content, and category are required",
      });
    }

    if (!allowedCategories.includes(normalizedCategory)) {
      return rejectWithCleanup(httpStatus.BAD_REQUEST, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: `category must be one of: ${allowedCategories.join(", ")}`,
      });
    }

    if (normalizedUserId && !mongoose.Types.ObjectId.isValid(normalizedUserId)) {
      return rejectWithCleanup(httpStatus.BAD_REQUEST, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "userId must be a valid MongoDB ObjectId",
      });
    }

    const existingBlog = await Blog.findOne({ slug: normalizedSlug });
    if (existingBlog) {
      return rejectWithCleanup(httpStatus.CONFLICT, {
        statusCode: httpStatus.CONFLICT,
        success: false,
        message: "A blog post with this slug already exists",
      });
    }

    const blog = await Blog.create({
      title: normalizedTitle,
      slug: normalizedSlug,
      content: normalizedContent,
      image: typeof image === "string" && image.trim() ? image.trim() : undefined,
      category: normalizedCategory,
      tags: normalizeTags(tags),
      isPublished: normalizeBoolean(isPublished, true),
      blogImage: coverImage?.path || "",
      blogImagePublicId: coverImage?.filename || "",
      blogImages: galleryImages.map(toCloudinaryImage),
      userId: normalizedUserId || undefined,
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
        isPublished: blog.isPublished,
        userId: blog.userId,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      },
    });
  } catch (error) {
    if (!blogCreated) {
      await cleanupUploadedFiles(uploadedFiles);
    }

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
