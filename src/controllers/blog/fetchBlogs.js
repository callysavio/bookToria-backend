import Blog from "../../models/blog.js";
import httpStatus from "http-status";

// Controller for fetching all blog posts
const fetchBlogs = async (req, res) => {
  try {
    // 1. Fetch all blog posts from the database in descending order of creation date
    const blogs = await Blog.find({status: "published"}).sort({
      createdAt: -1,
    }); 
    // 2. Check if any blogs were found
    if (blogs.length === 0 || !blogs ) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "No published blog(s) found",
      });
    }
    //3. Return the fetched blog posts - only published blogs
    const blogData = blogs.filter((blog) => blog.status === "published").map((blog) => ({
      id: blog._id,
      title: blog.title,
      content: blog.content,
      tags: blog.tags,
      date: blog.createdAt,
      category: blog.category,
      blogImage: blog.blogImage,
    }));
    
    return res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog posts fetched successfully",
      totalBlogs: blogs.length,
      data: blogData,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Error fetching blog posts",
      error: error.message,
    });
  }
};
export default fetchBlogs;
