import blog from "../../models/blog.js";
import httpStatus from "http-status";

// Controller for deleting a blog post
const deleteBlog = async (req, res) => {
  try {
    // 1. Get blog ID from the request parameters
    const { id } = req.params;
    // 2. Check if the blog post exists
    const existingBlog = await blog.findById(id);
    if (!existingBlog) {
      return res.status(httpStatus.NOT_FOUND).json({
         statusCode: httpStatus.NOT_FOUND,
         success: false,
         message: "Blog post not found" 
        });
    }
    // 3. Delete the blog post
    await blog.findByIdAndDelete(id);
    // 4. Send a success response
    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog post deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Internal server error"
    });
  }
};

export { deleteBlog };