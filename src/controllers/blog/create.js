import httpStatus from "http-status";
import Blog from "../../models/blog.js";

export const createBlog = async (req, res) => {
    try {
        const { title, content, categories, tags } = req.body;
        // const author = req.user._id;

        const existingBlog = Blog.findOne({ title });
        if (existingBlog) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: httpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                message: "A blog with this title already exists",
            });
        };

        let blog;

        blog = await Blog.create({ title, content, categories, tags });

        return res.status(httpStatus.CREATED).json({
            statusCode: httpStatus.CREATED,
            success: true,
            message: "Blog Uploaded Successfully",
            data: {
                // author: blog._id,
                title: blog.title,
                content: blog.content,
                categories: blog.categories,
                tags: blog.tags,
            },
        })
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            message: "An error occurred during Uploading",
            error: err.message,
        });
    }
}