import Blog from "../../models/blog.js";
import httpStatus from "http-status";

//controller for deleting a blog post
export const deleteBlog = async (req, res) => {
  try {
    //1. get blog id from the request parameter
    const { id } = req.params;
    //2. check if blog post exists
    let deleteBlog = await Blog.findById(id);
    if (!deleteBlog) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "Blog post not found"
      });
    }
    //3. delete blog post
    await Blog.findByIdAndDelete(id);
    return res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog post deleted successfully"
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Internal server error"
    });
  }
};