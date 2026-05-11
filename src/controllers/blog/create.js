import Blog from "../../models/blog.js";
import httpStatus from "http-status";
import { createBlogValidationSchema } from "../../validators/blogValidator.js";

// Controller for creating a new blog post
export const createBlog = async (req, res) => {
  try {
    // 1. Get blog data from the request body and validate it
    const { error } = createBlogValidationSchema.validate(req.body);
    if (error) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "Invalid blog post data",
        error: error.details.map((detail) => detail.message),
      });
    }

    // 2. Get blog data from the request body
    const { title, content, category, tags } = req.body;
    // const author = req.user.id; // Assuming user is authenticated and user ID is available in req.user
    // 3. Define the blog variable to store the created blog post
    let blog;
    //4. Check if blog with the same title already exists
    const existingBlog = await Blog.findOne({ title });
    if (existingBlog) {
      return res.status(httpStatus.CONFLICT).json({
        statusCode: httpStatus.CONFLICT,
        success: false,
        message: "A blog post with this title already exists",
      });
    }
    // 4. Create a new blog post
    blog = await Blog.create({
      title,
      content,
      category,
      tags,
      // author,
    });

    // 5. Return the created blog post
    return res.status(httpStatus.CREATED).json({
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Blog post created successfully",
      data: blog,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "An error occurred while creating the blog post",
      error: error.message,
    });
  }
};
