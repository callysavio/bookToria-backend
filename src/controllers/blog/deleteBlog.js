import Blog from "../../models/blog";
import httpStatus from "http-status";

export const deleteBlog = async (req, res) => {
    try {
        // 1. get the blog id from the request parameter
        const { id } = req.params;
        //2. check if the blog exists
        let blog = await Blog.findById(id);
        if (!blog) {
            return res.status(httpStatus.NOT_FOUND).json({
                statusCode: httpStatus.NOT_FOUND,
                success: false,
                message: "Blog not found",
            });
        }
        //3. delete the blog
        await Blog.findByIdAndDelete(id);
        // 4. return success response
        return res.status(httpStatus.OK).json({
            statusCode: httpStatus.OK,
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            message: "Error deleting blog",
            error: error.message,
        });
    }
};