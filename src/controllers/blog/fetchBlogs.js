import httpStatus from "http-status";
import Blog from "../../models/blog.js";

export const fetchBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(10);

    return res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "An error occurred while fetching blogs",
      error: error.message,
    });
  }
};

export default fetchBlogs;
