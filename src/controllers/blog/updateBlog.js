import Blog from "../../models/blog.js";
import httpStatus from "http-status";
import { updateBlogValidationSchema } from "../../validators/authValidator.js";

// Controller for updating blog details
const updateBlog = async (req, res) => {
  try {
    // 1. Get blog ID from request parameters
    const { id } = req.params;

    // 2. Get blog data from request body
    const {
      title,
      slug,
      content,
      image,
      category,
      tags,
      isPublished,
      userId,
    } = req.body;

    // 3. Find the blog by ID and update the details
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title: title,
        slug: slug,
        content: content,
        image: image,
        category: category,
        tags: tags,
        isPublished: isPublished,
        userId: userId,
      },
      { new: true },
    );

    if (!updatedBlog) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog details updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Error updating blog details",
      error: error.message,
    });
  }
};

export { updateBlog };
