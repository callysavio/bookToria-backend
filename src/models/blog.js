import mongoose from "mongoose";

// Define the User schema
const blogSchema = new mongoose.Schema(
  {
    blogImage: {
      type: [String],
      default: [],
    },

    // NEW FIELD
    blogImagePublicId: {
      type: [String],
      default: [],
    },

    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
