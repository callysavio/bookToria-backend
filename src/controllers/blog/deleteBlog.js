import Blog from "../../models/blog.js";
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
<<<<<<< HEAD
=======

    // 4. Delete the blog post
>>>>>>> 51e7bc1234fdafef7afd954c7c6dd9aaf30d4721
    await Blog.findByIdAndDelete(id);
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
