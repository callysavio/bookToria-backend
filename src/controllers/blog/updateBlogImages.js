import httpStatus from "http-status";
import mongoose from "mongoose";
import Blog from "../../models/blog.js";
import {
  cleanupUploadedFiles,
  deleteCloudinaryAsset,
  deleteCloudinaryAssets,
  getUploadedFile,
  getUploadedFiles,
  toCloudinaryImage,
} from "../../utils/cloudinaryAssets.js";

const invalidBlogIdResponse = (res) =>
  res.status(httpStatus.BAD_REQUEST).json({
    statusCode: httpStatus.BAD_REQUEST,
    success: false,
    message: "Invalid blog ID",
  });

export const updateBlogImage = async (req, res) => {
  const { id } = req.params;
  const blogImage = getUploadedFile(req, "blogImage");
  const uploadedFiles = blogImage ? [blogImage] : [];
  let saved = false;

  try {
    if (!blogImage) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "blogImage is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      await cleanupUploadedFiles(uploadedFiles);

      return invalidBlogIdResponse(res);
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      await cleanupUploadedFiles(uploadedFiles);

      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "Blog not found",
      });
    }

    const oldPublicId = blog.blogImagePublicId;

    blog.blogImage = blogImage.path;
    blog.blogImagePublicId = blogImage.filename;
    await blog.save();
    saved = true;

    if (oldPublicId !== blogImage.filename) {
      await deleteCloudinaryAsset(oldPublicId);
    }

    return res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog image updated successfully",
      data: {
        id: blog._id,
        blogImage: blog.blogImage,
        blogImagePublicId: blog.blogImagePublicId,
      },
    });
  } catch (error) {
    if (!saved) {
      await cleanupUploadedFiles(uploadedFiles);
    }

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "An error occurred while updating the blog image",
      error: error.message,
    });
  }
};

export const updateBlogImages = async (req, res) => {
  const { id } = req.params;
  const blogImages = getUploadedFiles(req, "blogImages");
  let saved = false;

  try {
    if (!blogImages.length) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "At least one blogImages file is required",
      });
    }

    if (blogImages.length > 5) {
      await cleanupUploadedFiles(blogImages);

      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "You can upload a maximum of 5 blog images",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      await cleanupUploadedFiles(blogImages);

      return invalidBlogIdResponse(res);
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      await cleanupUploadedFiles(blogImages);

      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "Blog not found",
      });
    }

    const oldPublicIds = blog.blogImages.map((image) => image.publicId);

    blog.blogImages = blogImages.map(toCloudinaryImage);
    await blog.save();
    saved = true;

    await deleteCloudinaryAssets(oldPublicIds);

    return res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog images uploaded successfully",
      data: {
        id: blog._id,
        blogImages: blog.blogImages,
      },
    });
  } catch (error) {
    if (!saved) {
      await cleanupUploadedFiles(blogImages);
    }

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "An error occurred while uploading blog images",
      error: error.message,
    });
  }
};
