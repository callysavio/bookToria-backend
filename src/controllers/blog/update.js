import Blog from "../../models/blog.js";
import httpStatus from "http-status";
import { updateBlogValidationSchema } from "../../validators/blogValidator.js";

const updateBlog = async (req, res) => {
    try {
        // 1. Get blog ID from the request parameters
        const { id } = req.params;

        // 2. Validate the update data
        const { error } = updateBlogValidationSchema.validate(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                statusCode: httpStatus.BAD_REQUEST,
                success: false,
                message: "Invalid blog post data",
                error: error.details.map((detail) => detail.message),
            });
        }
        // 3. Get the data to be updated from the request body
        const { title, content, category, tags } = req.body;
        // 4. Find the blog by ID and update the details
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title: title, content: content, category: category, tags: tags },
            { new: true },
        );
        if (!updatedBlog) {
            return res.status(httpStatus.NOT_FOUND).json({
                statusCode: httpStatus.NOT_FOUND,
                success: false,
                message: "Blog post not found",
            });
        }
        // 5. Return the updated blog post
        return res.status(httpStatus.OK).json({
            statusCode: httpStatus.OK,
            success: true,
            message: "Blog post updated successfully",
            data: updatedBlog,
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            message: "An error occurred while updating the blog post",
            error: error.message,
        });
    }
}

export { updateBlog };
