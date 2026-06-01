import blog from "../models/blog.js"
import httpStatus from "http-status";


const deleteBlog = async (req, res) => {
   try {
      // 1. Get blog ID from the request parameters
      const { id } = req.params;
      // 2. Fetch the blog post from the database using the ID
      const blog = await blog.findById(id);
      // 3. Check if the blog post was found
      if (!blog) {
         return res.status(httpStatus.NOT_FOUND).json({
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: `Blog post with ID ${id} not found.`,
         });
      }
      // 4. Delete the blog post
      await blog.findByIdAndDelete(id);
      // 5. Return a success response
      return res.status(httpStatus.OK).json({
         statusCode: httpStatus.OK,
         success: true,
         message: "Blog post deleted successfully",
      });

      
