import Blog from "../../models/blog.js";
import httpStatus from "http-status";

// Controller for updating a blog post
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, status, category, tags } = req.body;

    // Find the blog post by ID
    const updateBlog = await Blog.findById(id, req.id, { new: true });
    if (!updateBlog) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "Blog post not found",
      });
    }

    // Update the blog post
    updateBlog.title = title;
    updateBlog.content = content;
    updateBlog.status = status;
    updateBlog.category = category;
    updateBlog.tags = tags;

    // Save the updated blog post
    update  blog.status = status;
    blog.category = category;
    blog.tags = tags;

    // Save the updated blog post
    const updatedBlog = await blog.save();

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog post updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "An error occurred while updating the blog post",
    });
  }
};
