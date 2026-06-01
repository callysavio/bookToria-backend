import blog from "../models/blog.js"
import httpStatus from "http-status";


const updateBlog = async (req, res) => {

   try {
      const { id } = req.params;
      const blog = await Blog.findById(id);
      if (!blog) {
         return res.status(httpStatus.NOT_FOUND).json({
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: `Blog post with ID ${id} not found.`,
         });
      }
      await Blog.findByIdAndDelete(id);
      return res.status(httpStatus.OK).json({
         statusCode: httpStatus.OK,
         success: true,
         message: "Blog post deleted successfully",
      });
   } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
         statusCode: httpStatus.INTERNAL_SERVER_ERROR,
         success: false,
         message: "Error deleting blog post",
}
