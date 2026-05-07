import Blog from "../../models/blog.js";
import httpStatus from "http-status";

const updateBlog = async (req, res) => {
    try{
        const { id } = req.params;
        const { title, content, status, category, tags } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, content, status, category, tags },
            { new: true },
        );
        if (!updatedBlog) {
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                success: false,
                message: "Blog not found",
            });
        }
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            success: true,
            message: "Blog updated successfully",
            data: updatedBlog,
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            message: "Internal server error",
        });
    }
};


export { updateBlog };