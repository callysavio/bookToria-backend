import Blog from "../../models/blog.js";
import httpStatus from "http-status";
import cloudinary from "../../config/cloudinary.js";

// Controller for updating a blog post
const updateBlog = async (req, res) => {
  try {
    // 1. Extract blog post ID from the request params
    const { id } = req.params;
    // 2. Get the data to be updated from the request body
    const { title, author, content } = req.body;
    // 3. Find the blog post by ID and update the specified fields
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, author, content },
      { new: true }, // Return the updated document
    );
    if (!updatedBlog) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "Blog post not found",
      });
    }
    //4. Handle uploaded files (supports multiple)
    const files = req.files || [];
    const oldPublicIds = updatedBlog.blogImagePublicId || [];

    // delete existing Cloudinary images sequentially
    for (let i = 0; i < oldPublicIds.length; i++) {
      await cloudinary.uploader.destroy(oldPublicIds[i]);
    }

    // collect new filenames (avoid .map)
    const newFilenames = [];
    for (let i = 0; i < files.length; i++) {
      newFilenames.push(files[i].filename);
    }

    updatedBlog.blogImage = newFilenames;
    updatedBlog.blogImagePublicId = newFilenames;

    //Update other fields
    updatedBlog.title = title || updatedBlog.title;
    updatedBlog.author = author || updatedBlog.author;
    updatedBlog.content = content || updatedBlog.content;

    await updatedBlog.save();

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Blog post updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Error updating blog post",
      error: error.message,
    });
  }
};

export { updateBlog };
