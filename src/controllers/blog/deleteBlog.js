import Blog from "../../models/blog.js";
import httpStatus from "http-status";
// Controller for deleting a blog post
export const deleteBlog = async (req, res) => {
  try {
    // 1. Extract blog post ID from the request params
    const { id } = req.params;
    //2. Check if the blog post exists
    let blog = await Blog.findById(id);
    if (!blog) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "Blog post not found",
      });
    }

    // 3. Delete the blog post
    await Blog.findByIdAndDelete(id);
    // 4. Return a success response
    return res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog post deleted successfully",
    });
    // 5. Handle errors
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "An error occurred while deleting the blog post",
      error: error.message,
    });
  }
};
