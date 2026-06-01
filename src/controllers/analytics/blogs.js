import Blog from "../../models/blog.js";
import httpStatus from "http-status";
const blogsPerCategory = async (req, res) => {
  try {
    const result = await Blog.aggregate([
      //stage1:grouping
      {
        $group: {
          _id: "$category",
          totalBlogs: { $sum: 1 },
        },
      },
      //Stage2:sorting
      {
        $sort: { totalBlogs: -1 },
      },
    ]);

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Total Blogs per category fetched successfully.",
      data: result,
    });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "An error occurred while fetching Data.",
      error: e.message,
    });
  }
};

//get blogs by status
const getBlogStatusStats = async (req, res) => {
  try {
    const result = await Blog.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Total Blogs per status fetched successfully.",
      data: result,
    });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "An error occurred while fetching Data.",
      error: e.message,
    });
  }
};

const getBlogsWithAuthors = async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
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
          category: 1,
          status: 1,
          createdAt: 1,
          authorInfo: {
            name: "$authorDetails.username",
            email: "$authorDetails.email",
            role: "$authorDetails.role",
            profilePicture: "$authorDetails.profilePicture",
          },
        },
      },
    ]);

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Blogs with authors fetched successfully.",
      data: blogs,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "An error occurred while fetching Data.",
      error: e.message,
    });
  }
};

export { blogsPerCategory, getBlogStatusStats, getBlogsWithAuthors };
