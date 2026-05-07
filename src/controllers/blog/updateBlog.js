import Blog from "../../models/blog.js";
import httpStatus from "http-status";

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const { title, status, category } = req.body;

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title: title, status: status, category: category },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(httpStatus.NOT_FOUND).json({
                statusCode: httpStatus.NOT_FOUND,
                success: false,
                message: "Blog not found"
            });
        };

        res.status(httpStatus.OK).json({
            statusCode: httpStatus.OK,
            success: true,
            message: "Blog updated successfully",
            data: updatedBlog,
        });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            message: "Error updating blog",
            error: error.message
        });
    };
};

export { updateBlog };