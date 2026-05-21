import Blog from "../../models/blog.js";
import httpStatus from "http-status";
import { createBlogValidationSchema } from "../../validators/authValidator.js";
// Controller for creating a new blog post
export const createBlog = async (req, res) => {
  try {
    //console.log(req.body);
    //console.log(req.file);
    // 1. Get blog data from the request body
    const { title, content, category, tags } = req.body;

    // 2. Validate the blog data
    const { error } = createBlogValidationSchema.validate({
      title,
      content,
      category,
      tags,
    });
    if (error) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "Invalid blog data",
        error: error.details[0].message,
      });
    }
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
    const files = req.files || [];

    // 4. Create a new blog post
    blog = await Blog.create({
      title,
      content,
      category,
      tags: tags || [],
      blogImage: files.map((file) => file.filename),
      blogImagePublicId: files.map((file) => file.filename),
      // author: req.user.id
    });

    // 5. Return the created blog post
    return res.status(httpStatus.CREATED).json({
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Blog post created successfully",
      data: blog,
    });
  } catch (error) {
    //console.log(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "An error occurred while creating the blog post",
      error: error.message,
    });
  }
};
