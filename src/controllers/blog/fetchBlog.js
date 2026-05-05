import Blog from "../../models/blog.js";
import httpStatus from "http-status";

//controller to fetch all blogs
const fetchAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        return res.status("published").sort({createdAt: -1});

        //check if NY BLOGS WERE FOUND
        if (blogs.length === 0 || !blogs) {
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                success: false,
                message: "No blogs found",
            });
        }

        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            success: true,
            message: "Blogs fetched successfully",
            data: blogs,
        });
    }catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to fetch blogs",
            error: error.message,
        });
    }
};