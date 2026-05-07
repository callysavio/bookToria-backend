import Blog from "../../models/blog.js";
import httpStatus from "http-status";

// Controller for updating a blog post
export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, category, tags } = req.body;

        // Use findByIdAndUpdate with { new: true } to update and get the doc in one go
        const updatedBlog = await Blog.findByIdAndUpdate(
            id, 
            {title: title, content: content, category: category, tags: tags}, 
            { new: true} // runValidators ensures the update matches your schema
        );

        if (!updatedBlog) {
            return res.status(httpStatus.NOT_FOUND).json({
                statusCode: httpStatus.NOT_FOUND,
                success: false,
                message: "Blog post not found",
            });
        }

        res.status(httpStatus.OK).json({
            statusCode: httpStatus.OK,
            success: true,
            message: "Blog post updated successfully",
            data: updatedBlog
        });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            message: error.message || "An error occurred while updating the blog post",
        });
    }
};

