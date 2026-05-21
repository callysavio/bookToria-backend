import httpStatus from "http-status";
import mongoose from "mongoose";
import Blog from "../../models/blog.js";
import {
  cleanupUploadedFiles,
  getUploadedFile,
  getUploadedFiles,
  toCloudinaryImage,
} from "../../utils/cloudinaryAssets.js";

const allowedCategories = [
  "general",
  "food",
  "travel",
  "technology",
  "lifestyle",
  "education",
];
const allowedStatuses = ["draft", "published"];

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

const buildSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

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
    const {
      title,
      slug,
      content,
      image,
      category,
      tags,
      isPublished,
      status,
      userId,
      author,
    } = req.body;

    const normalizedTitle = typeof title === "string" ? title.trim() : "";
    const normalizedSlug =
      typeof slug === "string" && slug.trim()
        ? buildSlug(slug)
        : buildSlug(normalizedTitle);
    const normalizedContent = typeof content === "string" ? content.trim() : "";
    const normalizedCategory =
      typeof category === "string" ? category.trim().toLowerCase() : "";
    const normalizedUserId =
      typeof userId === "string" ? userId.trim() : userId;
    const normalizedAuthorId =
      typeof author === "string" ? author.trim() : author;
    const blogAuthorId = normalizedAuthorId || normalizedUserId || req.user?.id;
    const normalizedStatus =
      typeof status === "string" ? status.trim().toLowerCase() : "";
    const isPublishedValue = normalizeBoolean(
      isPublished,
      normalizedStatus ? normalizedStatus === "published" : true,
    );
    const blogStatus =
      normalizedStatus || (isPublishedValue ? "published" : "draft");

    if (
      !normalizedTitle ||
      !normalizedSlug ||
      !normalizedContent ||
      !normalizedCategory
    ) {
      return rejectWithCleanup(httpStatus.BAD_REQUEST, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "title, content, and category are required",
      });
    }

    if (!allowedCategories.includes(normalizedCategory)) {
      return rejectWithCleanup(httpStatus.BAD_REQUEST, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: `category must be one of: ${allowedCategories.join(", ")}`,
      });
    }

    if (!allowedStatuses.includes(blogStatus)) {
      return rejectWithCleanup(httpStatus.BAD_REQUEST, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: `status must be one of: ${allowedStatuses.join(", ")}`,
      });
    }

    if (!blogAuthorId || !mongoose.Types.ObjectId.isValid(blogAuthorId)) {
      return rejectWithCleanup(httpStatus.BAD_REQUEST, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "author must be a valid MongoDB ObjectId",
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
      status: blogStatus,
      isPublished: isPublishedValue,
      blogImage: coverImage?.path || "",
      blogImagePublicId: coverImage?.filename || "",
      blogImages: galleryImages.map(toCloudinaryImage),
      userId: normalizedUserId || undefined,
      author: blogAuthorId,
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
