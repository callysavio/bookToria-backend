import Blog from "../../models/blog.js";
import cloudinary from "../../config/cloudinary.js";
import httpStatus from "http-status";
// Fetch all blogs
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Blog not found",
      });
    }
    //4.Delete blog image from cloudinary
    if (existingBlog.blogImagePublicId) {
      await cloudinary.uploader.destroy(existingBlog.blogImagePublicId);
    }
    // 5. Delete the blog post
    await Blog.findByIdAndDelete(id);
    // 6. Return a success response
    return res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Error deleting blog",
      error: error.message,
    });
  }
};
