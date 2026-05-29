import Blog from "../../models/blog.js";
import cloudinary from "../../config/cloudinary.js";
import httpStatus from "http-status";

const deleteBlog = async (req, res) => {
  try {
    // 1. Get blog ID from the request parameters
    const { id } = req.params;
    // 2. Fetch the blog post from the database using the ID
    const existingBlog = await Blog.findById(id);
    // 3. Check if the blog post was found
    if (!existingBlog) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: `Blog post with ID ${id} not found.`,
      });
    }

    //4. Delete blog image from Cloudinary
    if (existingBlog.blogImagePublicId) {
      await cloudinary.uploader.destroy(existingBlog.blogImagePublicId);
    }

    // 5. Delete the blog post
    await Blog.findByIdAndDelete(id);
    // 6. Return a success response
    return res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "An error occurred while deleting the blog post",
      error: error.message,
    });
  }
};

export { deleteBlog };
