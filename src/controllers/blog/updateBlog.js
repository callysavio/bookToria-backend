import blog from "../../models/blog.js";
import httpStatus from "http-status";

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;

    const updatedBlog = await blog.findByIdAndUpdate(
      id,
      { title, content, author },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Blog not found"
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error updating blog",
      error: error.message
    });
  }
};