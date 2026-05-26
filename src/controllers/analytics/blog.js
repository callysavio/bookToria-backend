import Blog from "../../models/blog.js";
import httpStatus from "http-status";

export const blogsPerCategory = async (req, res) => {
    try {
        const result = await Blog.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalBlogs: { $sum: 1 },
                },
            },
            {
                $sort: {
                    totalBlogs: -1,
                },
            },
        ]);

        return res.status(httpStatus.OK).json({
            statusCode: httpStatus.OK,
            success: true,
            message: "Blogs per category fetched successfully",
            data: result,
        });
    } catch (e) {
        console.error("DEBUG BLOGS PER CATEGORY ERROR:", e);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            message: "An error occurred while fetching data",
            error: e.message,
        });
    }
};

export const getBlogsByStatusStats = async (req, res) => {
    try {
        const result = await Blog.aggregate([
            {
                $group: {
                    _id: "$status",
                    totalBlogs: { $sum: 1 },
                },
            },
            {
                $sort: {
                    totalBlogs: -1,
                },
            },
        ]);

        return res.status(httpStatus.OK).json({
            statusCode: httpStatus.OK,
            success: true,
            message: "Blogs by status fetched successfully",
            data: result,
        });
    } catch (e) {
        console.error("DEBUG BLOGS BY STATUS ERROR:", e);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            message: "An error occurred while fetching data",
            error: e.message,
        });
    }
};

export const getBlogsByAuthorStats = async (req, res) => {
    try {
        const result = await Blog.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "authorDetails",
                },
            },
            {
                $unwind: "$authorDetails",
            },
            {
              $project: {
                title: 1,
                status: 1,
                category: 1,
                tags: 1,
                authorInfo: {
                    username: "$authorDetails.username",
                    email: "$authorDetails.email",
                    role: "$authorDetails.role",
                    profilePicture: "$authorDetails.profilePicture",
                    createdAt: "$authorDetails.createdAt",
                    updatedAt: "$authorDetails.updatedAt",
                    totalBlogs: { $sum: 1 },
                }                
              },
            }
        ]);


        return res.status(httpStatus.OK).json({
            statusCode: httpStatus.OK,
            success: true,
            message: "Blogs by author fetched successfully",
            totalBlogs: result.length,
            data: result,
        });

    } catch (e) {
        console.error("DEBUG BLOGS BY AUTHOR ERROR:", e);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            message: "An error occurred while fetching data",
            error: e.message,
        });
    }
};