import Blog from "../../models/blog.js";
import httpStatus from "http-status";
// Controller for updating blog details
const updateBlog = async (req, res) => {
  try {
    // 1. Get blog ID from the request parameters
    const { id } = req.params;
    // 2. Get the data to be updated blog data from the request body
    const { title, content, category,
      tags, author } = req.body;
    // 3. Find the blog by ID and update the details
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title: title, content: content, category: category, tags: tags, author: author },
      { new: true },
    );
    if (!updatedBlog) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "Blog not found",
      });
    }
    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog details updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Error updating blog details",
      error: error.message,
    });
  }
};
export { updateBlog };
