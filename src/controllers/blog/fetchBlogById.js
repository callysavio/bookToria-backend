import Blog from "../../models/blog.js";
import httpStatus from "http-status";

// Controller for fetching a blog  post details by ID
const fetchBlogById = async (req, res) => {
  try {
    // 1. Get blog ID from the request parameters
    const { id } = req.params;

    //2. Fetch the blog post from the database using the ID
    const blog = await Blog.findById(id);
    // 3. Check if the blog post was found
    if (!blog) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "Blog not found",
      });
    }
    // 4. Return the fetched blog post
    return res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog post fetched successfully",
      data: blog,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Error fetching blog post",
      error: error.message,
    });
  }
};
export default fetchBlogById;
