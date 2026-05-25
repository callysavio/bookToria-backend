import Blog from "../../models/blog.js";
import httpStatus from "http-status";
import User from "../../models/user.js";
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

const topAuthors = async (req, res) => {
  try {
    const result = await Blog.aggregate([
      {
        $group: {
          _id: "$author",
          totalBlogs: { $sum: 1 },
        },
      },
      {
        $sort: { totalBlogs: -1 },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $project: {
          totalBlogs: 1,
          username: "$author.username",
          email: "$author.email",
        },
      },
      {
        $limit: 5,
      },
    ]);

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Top authors fetched successfully.",
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

const recentPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      {
        $match: {
          status: "published",
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Recent Publish Blogs fetched successfully.",
      data: blogs,
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

const blogsLast7Days = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const blogs = await Blog.aggregate([
      {
        $match: {
          createdAt: {
            $gte: sevenDaysAgo,
          },
        },
      },
    ]);

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Blogs in Last 7 Days fetched successfully.",
      data: blogs,
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

const blogTagsStats = async (req, res) => {
  try {
    const result = await Blog.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          total: { $sum: 1 },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
    ]);

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog Tags Stats fetched successfully.",
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

const paginatedBlogs = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const blogs = await Blog.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Blogs with Pagination fetched successfully.",
      data: blogs,
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

const adminDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalBlogs = await Blog.countDocuments();

    const publishedBlogs = await Blog.countDocuments({
      status: "published",
    });

    const draftBlogs = await Blog.countDocuments({
      status: "draft",
    });

    const categoryStats = await Blog.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Dashboard Stats fetched successfully.",
      stats: {
        totalUsers,
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        categoryStats,
      },
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

const searchBlogs = async (req, res) => {
  try {
    const keyword = req.query.keyword;

    const blogs = await Blog.aggregate([
      {
        $match: {
          title: {
            $regex: keyword,
            $options: "i",
          },
        },
      },
    ]);

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Search Blogs fetched successfully.",
      data: blogs,
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

export {
  blogsPerCategory,
  getBlogStatusStats,
  getBlogsWithAuthors,
  topAuthors,
  recentPublishedBlogs,
  blogsLast7Days,
  blogTagsStats,
  paginatedBlogs,
  adminDashboardStats,
  searchBlogs,
};
