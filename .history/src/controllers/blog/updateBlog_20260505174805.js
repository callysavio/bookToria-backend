import Blog from '../../models/blog.js'
import httpStatus from "http-status";
import mongoose from "mongoose";

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params

        // Check if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(httpStatus.BAD_REQUEST).json({
                statusCode: httpStatus.BAD_REQUEST,
                success: false,
                message: "Invalid Blog ID format",
            });
        }

        // Use runValidators to ensure enum/required fields are respected
        // Passing req.body directly allows for partial updates
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        )

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
}

export { updateBlog }